import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import VideoVerification from "./VideoVerification";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  phone: z.string().min(10, "Введите корректный номер телефона"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPhoneNumber(values.phone);
    
    // Проверка, не заблокирован ли этот профиль
    const blockedProfiles = JSON.parse(localStorage.getItem("blockedProfiles") || "{}");
    if (blockedProfiles[values.phone]) {
      setIsBlocked(true);
      setBlockReason(blockedProfiles[values.phone]);
      setIsLoading(false);
      return;
    }
    
    // Имитация API запроса
    setTimeout(() => {
      const isRegistered = localStorage.getItem("isRegistered") === "true";
      
      if (isRegistered) {
        setShowVerification(true);
      } else {
        alert("Пользователь не найден. Пожалуйста, зарегистрируйтесь.");
      }
      
      setIsLoading(false);
    }, 1000);
  }

  if (showVerification) {
    return <VideoVerification onClose={onClose} phoneNumber={phoneNumber} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        {isBlocked && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Аккаунт заблокирован</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{blockReason}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="+7 (___) ___-__-__" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Введите пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading || isBlocked}>
          {isLoading ? "Проверка..." : "Войти"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
