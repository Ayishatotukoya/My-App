import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/components/schema'
import { useForgotPassword } from '@/lib/mutation'
import { toast } from 'sonner'
import { AuthLayout } from '@/components/AuthLayout'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'



export const Route = createFileRoute('/Auth/forgot-password')({
  component: ForgetPassword,
})

export default function ForgetPassword(){

const [darkMode, setDarkMode] =useState(false)
const router = useRouter();

const form =useForm<ForgotPasswordData>({
  resolver: zodResolver(forgotPasswordSchema),
  defaultValues: 
  {email:""},
})
const forgotPassword = useForgotPassword();
// const { setAuth} =authStore

const onsubmit = async(Value:ForgotPasswordData)=>
{
  try{
    await forgotPassword.mutateAsync(Value);
    toast.success("A reset link was sent to your email.")
    router.navigate({ to: "/Auth/email-check" });
    form.reset();
  }
  catch(e:any){
    toast.error(e?.response?.data?.message ?? "Failed to request reset");
  }
}
     return (
    <AuthLayout darkMode={darkMode} setDarkMode={setDarkMode} heroImage="/headerphoto.jpg" >
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Forgot Password</h2>
        <p className={cn(
                    "text-sm text-center mb-6",
                    darkMode ? "text-slate-100" : "text-gray-600"
                  )}>Enter your email and we’ll send a link to reset your password.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={forgotPassword.isPending} type="submit" className={cn(
                "w-full font-bold text-white",
                darkMode ? "bg-gray-600" : "bg-gray-800 "
              )}>
              {forgotPassword.isPending ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <Link to="/Auth/signin" className="text-blue-600">Back to Sign in</Link>
        </div>
      </div>
    </AuthLayout>
            )};
