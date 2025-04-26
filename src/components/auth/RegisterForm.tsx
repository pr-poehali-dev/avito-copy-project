import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  phone: z.string().min(10, "Введите корректный номер телефона"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

type RegisterFormProps = {
  onSwitch: () => void;
};

const RegisterForm = ({ onSwitch }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Имитация API запроса
    setTimeout(() => {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("userPhone", values.phone);
      
      toast({
        title: "Регистрация успешна",
        description: "Теперь вы можете войти в систему",
      });
      
      setIsLoading(false);
      onSwitch(); // Переключаемся на вкладку входа
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
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
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
        
        <div className="text-center text-sm text-gray-500">
          Уже есть аккаунт?{" "}
          <button 
            type="button" 
            onClick={onSwitch} 
            className="text-avito-blue hover:underline"
          >
            Войти
          </button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
