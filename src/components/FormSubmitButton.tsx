"use client"
import { ComponentProps } from "react"
import { useFormStatus } from "react-dom"

type FromSubmitButtonProps = {
    children: React.ReactNode
    className?: string
} & ComponentProps<"button">

export default function FromSubmitButton(
    {children, className}: FromSubmitButtonProps
) {
    const { pending } = useFormStatus()
    return (
        <button className={className} type="submit" disabled={pending}>
            {pending && <span className="loading loading-spinner"/>}
            {children}
        </button>    
    )
}