
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Lock, Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";

const inputClass =
    "block h-10 w-full rounded-md bg-neutral-100 pl-10 pr-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:bg-white focus:ring-1 focus:ring-brand";

const labelClass = "mb-1.5 block text-[13px] font-medium text-neutral-900";

type FormFieldProps = {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: typeof Mail;
};

function FormField({
    label,
    type,
    placeholder,
    value,
    onChange,
    icon: Icon,
}: FormFieldProps) {
    return (
        <label className="block">
            <span className={labelClass}>{label}</span>
            <span className="relative block">
                <Icon
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                    strokeWidth={1.75}
                    aria-hidden
                />
                <input
                    type={type}
                    required
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className={inputClass}
                />
            </span>
        </label>
    );
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.59-5.17 3.59-8.82z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
            />
            <path
                fill="#FBBC05"
                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
            />
        </svg>
    );
}

export default function SigninPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const updateField = (field: keyof typeof form, value: string | boolean) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { error } = await signIn.email({
            email: form.email,
            password: form.password,
            rememberMe: form.rememberMe,
        });

        if (error) {
            alert(error?.message || "Something went wrong. Please try again later.")
            return;
        }

        setForm({
            email: "",
            password: "",
            rememberMe: false,
        });

        // Demo only: no real auth backend yet.
        router.push("/profile");
    };

    return (
        <main className="min-h-screen flex-1 bg-white px-5 py-12 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <header className="text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500 sm:text-base">
                        Resume your adventure with Wanderlust
                    </p>
                </header>

                {/* Sign in card */}
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-8 w-full max-w-100 border border-border bg-white p-6 sm:p-7"
                >
                    <div className="space-y-4">
                        <FormField
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={(value) => updateField("email", value)}
                            icon={Mail}
                        />

                        <FormField
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(value) => updateField("password", value)}
                            icon={Lock}
                        />
                    </div>

                    {/* Remember me / forgot password */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
                            <input
                                type="checkbox"
                                checked={form.rememberMe}
                                onChange={(event) =>
                                    updateField("rememberMe", event.target.checked)
                                }
                                className="size-4 cursor-pointer accent-brand"
                            />
                            Remember me
                        </label>

                        <Link
                            href="#"
                            className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="mt-5 flex h-10 w-full items-center justify-center bg-brand text-sm font-medium text-white transition-colors hover:bg-brand/90"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3 text-[13px] text-neutral-500">
                        <span className="h-px flex-1 bg-border" aria-hidden />
                        Or continue with
                        <span className="h-px flex-1 bg-border" aria-hidden />
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/profile")}
                        className="flex h-10 w-full items-center justify-center gap-2 border border-border bg-white text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                        <GoogleIcon />
                        Sign Up With Google
                    </button>

                    <p className="mt-5 text-center text-sm text-neutral-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-brand transition-colors hover:text-brand/80"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}
