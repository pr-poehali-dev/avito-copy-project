import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type VideoVerificationProps = {
  onClose: () => void;
};

const VideoVerification = ({ onClose }: VideoVerificationProps) => {
  const [status, setStatus] = useState<"initial" | "capturing" | "processing" | "success" | "error" | "duplicate">("initial");
  const [faceDetected, setFaceDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Очистка при размонтировании
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setStatus("capturing");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Имитация обнаружения лица через 2 секунды
      setTimeout(() => {
        setFaceDetected(true);
      }, 2000);
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      setStatus("error");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && streamRef.current) {
      setStatus("processing");
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Настраиваем canvas на размер видео
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Рисуем кадр из видео на canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      
      // Останавливаем видеопоток
      streamRef.current.getTracks().forEach(track => track.stop());
      
      // Имитация проверки на сервере
      setTimeout(() => {
        // Проверяем, есть ли верификация в другом профиле
        const hasVerificationInOtherProfile = Math.random() > 0.5; // Случайный результат для демонстрации
        
        if (hasVerificationInOtherProfile) {
          setStatus("duplicate");
        } else {
          setStatus("success");
          localStorage.setItem("videoVerified", "true");
          
          toast({
            title: "Верификация успешна",
            description: "Вы успешно прошли проверку",
          });
          
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      }, 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Видеопроверка</h3>
        <p className="text-sm text-gray-500 mb-4">
          Для завершения входа необходимо пройти проверку лица
        </p>
      </div>
      
      <div className="rounded-lg overflow-hidden bg-gray-100 relative">
        {status === "initial" && (
          <div className="h-[240px] flex items-center justify-center">
            <Button onClick={startCamera} className="flex items-center gap-2">
              <Camera size={16} />
              Начать проверку
            </Button>
          </div>
        )}
        
        {(status === "capturing" || status === "processing") && (
          <div className="relative">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-full h-[240px] object-cover"
            />
            
            {faceDetected && status === "capturing" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-green-500/20 border-2 border-green-500 rounded-full w-36 h-36 flex items-center justify-center">
                  <Check className="text-green-500" size={48} />
                </div>
              </div>
            )}
            
            {status === "processing" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Проверка...</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {(status === "success" || status === "error" || status === "duplicate") && (
          <div className="h-[240px] flex items-center justify-center flex-col p-4">
            {status === "success" && (
              <>
                <div className="bg-green-100 rounded-full p-3 mb-3">
                  <Check className="text-green-600 h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium">Проверка пройдена</h4>
                <p className="text-sm text-gray-500 text-center">
                  Вы успешно прошли верификацию
                </p>
              </>
            )}
            
            {status === "error" && (
              <>
                <div className="bg-red-100 rounded-full p-3 mb-3">
                  <AlertCircle className="text-red-600 h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium">Ошибка проверки</h4>
                <p className="text-sm text-gray-500 text-center">
                  Не удалось выполнить проверку. Пожалуйста, попробуйте снова.
                </p>
                <Button variant="outline" onClick={startCamera} className="mt-3">
                  Повторить
                </Button>
              </>
            )}
            
            {status === "duplicate" && (
              <>
                <div className="bg-amber-100 rounded-full p-3 mb-3">
                  <AlertCircle className="text-amber-600 h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium">Обнаружен дубликат</h4>
                <p className="text-sm text-gray-500 text-center">
                  Эта видеоверификация уже привязана к другому профилю.
                  Пожалуйста, используйте оригинальный аккаунт.
                </p>
              </>
            )}
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
      
      {status === "capturing" && faceDetected && (
        <Button onClick={captureImage} className="w-full">
          Проверить
        </Button>
      )}
      
      {status !== "capturing" && status !== "processing" && status !== "success" && (
        <Button variant="outline" onClick={onClose} className="w-full">
          Закрыть
        </Button>
      )}
    </div>
  );
};

export default VideoVerification;
