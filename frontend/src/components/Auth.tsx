import { SignupInput } from "@prajyot_mane/blogapp-commons"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "signup" | "login"}) => {
 
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type}`, postInputs);
            const { jwt }= response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        } catch (e) {

        }

    }
    
 return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>
                    <div className="text-slate-400">{ type === "login" ? "Don't have an account?" : "Already have an account?" }
                    <Link className="pl-2 underline pl-2"  to={type === "login" ? "/signup" : "/login"}>{type === "login" ? "signup" : "login"}</Link></div>
                </div>
                <div className="pt-5">
                    { type === "signup" ? <LabeledInput label="Name"  type ="text" placeholder="John Doe" onChangefn={(e) => {
                        setpostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }}></LabeledInput>
                    : null}
                    <LabeledInput label="Email" type ="text" placeholder="JohnDoe@gmail.com" onChangefn={(e) => {
                        setpostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabeledInput>

                    <LabeledInput label="Password" type = "password" placeholder="John Doe" onChangefn={(e) => {
                        setpostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabeledInput>
                    <button onClick={sendRequest} type="button" className="py-2.5 px-5 me-2 my-2 text-sm font-semibold text-white focus:outline-none bg-slate-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 hover:border-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-blue dark:hover:bg-white w-full">{type === "signup" ? "Sign up" : "Log in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabeledInputType{
    label: string;
    placeholder: string;
    onChangefn: (e : ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

function LabeledInput({label , placeholder, onChangefn, type}: LabeledInputType){
    return <div>
         <div>
            <label className="block mb-2 text-sm text-black font-semibold">{label}</label>
            <input onChange={onChangefn} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" placeholder={placeholder} required />
        </div>
    </div>
}