import { UseAuthManager } from "@/hooks/auth.hook";
import { basePath } from "@/next.config";
import { authStateSelector, emailSelector, isMentorSelector, mentorDataSelector, otpResSelector, otpSelector, studentDataSelector, studentIdSelector } from "@/recoil/auth.atom";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Cookies from 'js-cookie';


const Login = () => {
    const [email, setEmail] = useRecoilState(emailSelector);
    const setOtpRes = useSetRecoilState(otpResSelector);
    const authManager = UseAuthManager();
    const [authState, setAuthState] = useRecoilState(authStateSelector);
    const [loading, setLoading] = useState(false);

    // otp states
    const [value, setValue] = useRecoilState(otpSelector);
    const userId = useRecoilValue(studentIdSelector);
    const setUser = useSetRecoilState(studentDataSelector);
    const setMentor = useSetRecoilState(mentorDataSelector);
    const router = useRouter();

    if(Cookies.get("CBaccessToken") && Cookies.get("CBuser")){
        router.push("/dashboard/page");
    }

    const isMentor = useRecoilValue(isMentorSelector);
    
    const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            let payload = {
                userId: userId as string,
                otp: value,
                isMentor:isMentor
            }
            let res = await authManager.verifyOTP(payload);
            if(res.data?.data) {
                if(isMentor){
                    Cookies.set('mentor',"1", {
                        expires: 7, 
                        // secure: process.env.NODE_ENV === 'production', 
                    });
                    setMentor(res?.data?.data?.user as Mentor);
                }else{
                    setUser(res?.data?.data?.user as User);
                }
                Cookies.set('CBaccessToken', res?.data?.data?.accessToken, {
                    expires: 7, 
                    // secure: process.env.NODE_ENV === 'production', 
                });
                Cookies.set('CBuser', res?.data?.data?.user.id, {
                    expires: 7, 
                    // secure: process.env.NODE_ENV === 'production', 
                });
                router.push("/dashboard/sales");
            }
        } catch (error: any) {
            alert('Invalid OTP');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();
        try {
            const res = await authManager.getOTP(email,isMentor);
            if (res.status == 200) {
                setOtpRes(res?.data as loginOTPResType);
                setAuthState(2);
            }
        } catch (error: any) {
            alert('Invalid credentials');
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <HelmetProvider>
                <Helmet>
                    <html className="h-full light" dir="ltr"></html>
                    <body className="error-page flex h-full !py-0 bg-white dark:bg-bgdark"></body>
                </Helmet>
                <div className="grid grid-cols-12 gap-6 w-full">
                    <div className="lg:col-span-6 col-span-12 hidden lg:block relative">
                        <div className="cover relative w-full h-full z-[1] p-10">
                            <Link href="#!" className="header- logo">
                                <img
                                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/brand-logos/desktop-light.png`}
                                    alt="logo"
                                    className="ltr:ml-auto rtl:mr-auto block"
                                />
                            </Link>
                            <div className="authentication-page !h-full justify-center w-full max-w-7xl mx-auto p-0">
                                <img
                                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/authentication/2.png`}
                                    alt="logo"
                                    className="mx-auto h-[500px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="authentication-page w-full">
                            <main id="content" className="w-full max-w-md mx-auto p-6">
                                <Link href="#!" className="header-logo lg:hidden">
                                    <img
                                        src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/brand-logos/desktop-logo.png`}
                                        alt="logo"
                                        className="mx-auto block dark:hidden"
                                    />
                                    <img
                                        src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/brand-logos/desktop-logo.png`}
                                        alt="logo"
                                        className="mx-auto hidden dark:block"
                                    />
                                </Link>
                                <div className="mt-7">
                                    <div
                                        id="pills-with-brand-color-01"
                                        role="tabpanel"
                                        aria-labelledby="pills-with-brand-color-item-1"
                                    >
                                        {authState !== 2 ? (
                                            <form className="p-4 sm:p-7" onSubmit={handleSubmit}>
                                                <div className="text-center">
                                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                                                        {isMentor?"Authority Sign In":"Sign In"}
                                                    </h1>
                                                </div>
                                                <div className="mt-5">
                                                    <div>
                                                        <div className="grid gap-y-4">
                                                            <div>
                                                                <label
                                                                    htmlFor="email"
                                                                    className="block text-sm mb-2 dark:text-white"
                                                                >
                                                                    Email address
                                                                </label>
                                                                <div className="relative">
                                                                    <input
                                                                        type="email"
                                                                        id="email"
                                                                        name="email"
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        placeholder="abc@gmail.com"
                                                                        value={email}
                                                                        className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <button
                                                                type="submit"
                                                                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                                            >
                                                                Get OTP
                                                                {loading ? <Loader /> : ""}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        ) : (
                                            <form className="p-4 sm:p-7" onSubmit={handleOTPSubmit}>
                                            <div className="text-center">
                                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                                                    Enter OTP
                                                </h1>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    Please enter the OTP sent to your email
                                                </p>
                                            </div>
                                            <div className="mt-5">
                                                <div className="grid gap-y-4">
                                                    <div>
                                                        <label className="block text-sm mb-2 dark:text-white">
                                                            OTP Code
                                                        </label>
                                                        <div className="relative">
                                                            <OTPInput 
                                                                value={value} 
                                                                onChange={setValue}
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                                        disabled={value.length !== 6 || loading}
                                                    >
                                                        Verify OTP
                                                        {loading ? <Loader /> : ""}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                                <button onClick={()=>setAuthState(1)} className="border-none underline capitalize">Send OTP again</button>
                                            </div>
                                        </form>
                                        )}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </HelmetProvider>
        </Fragment>
    );
};

export default Login;

const Loader = () => {
    return <div role="status">
        <svg
            aria-hidden="true"
            className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
}

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);
  
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // Only accept numbers
      if (!/^\d*$/.test(newValue)) return;
  
      if (newValue.length > 1) {
        // If user pastes a number
        const pastedValue = newValue.slice(0, 6);
        onChange(pastedValue);
        // Focus last input if paste length is 6
        if (pastedValue.length === 6) {
          inputRefs.current[5]?.focus();
        }
        return;
      }
  
      // Update the value
      const newOtpValue = value.split('');
      newOtpValue[index] = newValue;
      const updatedValue = newOtpValue.join('');
      onChange(updatedValue);
  
      // Move to next input if value is entered
      if (newValue !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault(); // Prevent default backspace behavior
        
        const currentValue = value[index] || '';
        const newOtpValue = value.split('');
        
        if (currentValue === '') {
          // If current input is empty and we're not at the first input
          if (index > 0) {
            // Clear previous input
            newOtpValue[index - 1] = '';
            onChange(newOtpValue.join(''));
            // Move focus to previous input
            inputRefs.current[index - 1]?.focus();
          }
        } else {
          // Clear current input
          newOtpValue[index] = '';
          onChange(newOtpValue.join(''));
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < 5) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault(); // Prevent up/down arrow keys
      }
    };
  
    return (
      <div className="flex gap-2 justify-center">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text" // Changed from "number" to "text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center border-2 rounded-md text-lg font-semibold 
                     focus:border-primary focus:ring-primary dark:bg-bgdark 
                     dark:border-white/10 dark:text-white/70
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            pattern="\d*"
            autoComplete="off"
          />
        ))}
      </div>
    );
};
