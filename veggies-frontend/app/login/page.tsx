"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/api/v1/user/login", user);
            console.log(response);
            if (response.data.success) {
                console.log("Login success", response.data);
                localStorage.setItem("veggies:token", response.data.token);
                localStorage.setItem("veggies:user", JSON.stringify(response.data));
                toast.success(response.data.message);
                router.push("/home");
            }

        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <section className="grid md:grid-cols-12 grid-cols-1 h-screen bg-mainBg text-mainText">
            <div className="max-[800px]:hidden col-span-6 border-white w-full h-full relative overflow-hidden ">
                <img
                    className="w-full h-full object-cover rounded-tr-xl rounded-br-xl"
                    src="https://media.istockphoto.com/id/1179823124/photo/fresh-vegetables-and-fruits-at-local-market-in-sanya-hainan-china.jpg?s=612x612&w=0&k=20&c=tYTPjEatXY49-Rs5oXhpWFnb8qwmViXarDmn78TFd2k=" alt="" />
                <div className="rounded-tr-xl rounded-br-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            </div>
            <div className="md:col-span-6 flex flex-col gap-4 w-full h-full justify-center items-center 
 p-12 rounded-md">

                <div className="flex flex-col h-80 w-80 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-md p-4 justify-center gap-6">
                    <h1 className="text-2xl font-extralight text-center ">
                        {loading ? "Loading..." : "Login"}
                    </h1>
                    <div className="relative w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={user.email}
                            id="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="px-4 py-2 rounded-md text-black focus:outline-none w-full border border-black/10 focus:ring-1 focus:ring-black/10"
                        />
                        <button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="20"
                                height="20"
                                viewBox="0 0 30 30"
                            >
                                <path d="M 4 5 C 2.9069372 5 2 5.9069372 2 7 L 2 23 C 2 24.093063 2.9069372 25 4 25 L 26 25 C 27.093063 25 28 24.093063 28 23 L 28 7 C 28 5.9069372 27.093063 5 26 5 L 4 5 z M 6.6992188 7 L 23.300781 7 L 15 13.134766 L 6.6992188 7 z M 5 9.4746094 L 15 16.865234 L 25 9.4746094 L 25 23 L 5 23 L 5 9.4746094 z"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={user.password}
                            id="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="px-4 py-2 rounded-md text-black focus:outline-none w-full border border-black/10 focus:ring-1 focus:ring-black/10"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="black"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="black"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div>
                        <Link className="text-mainText/50 text-xs" href="/signup">
                            Don't have an account?
                        </Link>
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled} // Use disabled attribute directly instead of managing class
                        className="w-full px-4 py-2 rounded-md bg-mainBg text-mainText "
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;