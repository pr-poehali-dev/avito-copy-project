import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, Check, Info, ShieldAlert, Smartphone } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type VideoVerificationProps = {
  onClose: () => void;
};

const VideoVerification = ({ onClose }: VideoVerificationProps) => {
  const [status, setStatus] = useState<
    | "initial"
    | "instructions"
    | "capturing"
    | "scanning"
    | "processing"
    | "success"
    | "error"
    | "duplicate"
    | "fake_detected"
    | "grimace_detected"
    | "blocked"
  >("initial");
  
  const [scanProgress, setScanProgress] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);
  const [circleSize, setCircleSize] = useState(100);
  const [blockReason, setBlockReason] = useState("");
  const [duplicatePhone, setDuplicatePhone] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // Очистка при размонтировании
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startInstructions = () => {
    setStatus("instructions");
  };

  const startCamera = async () => {
    try {
      setStatus("capturing");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
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
      setBlockReason("Не удалось получить доступ к камере");
    }
  };

  const startScanAnimation = () => {
    setStatus("scanning");
    setScanProgress(0);
    setCircleSize(100);
    
    let progress = 0;
    const animateScan = () => {
      progress += 0.5;
      setScanProgress(progress);
      
      // Уменьшаем размер круга постепенно до 70%
      if (progress <= 50) {
        setCircleSize(100 - (progress / 50) * 30);
      }
      
      if (progress < 100) {
        animationRef.current = requestAnimationFrame(animateScan);
      } else {
        // После завершения анимации переходим к обработке
        processFaceVerification();
      }
    };
    
    animationRef.current = requestAnimationFrame(animateScan);
  };

  const processFaceVerification = () => {
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
      
      toast({
        title: "Проверка",
        description: "Видео отправлено на проверку, данные обновятся через несколько секунд",
      });
      
      // Имитация проверки на сервере с различными возможными результатами
      setTimeout(() => {
        // Случайный результат для демонстрации возможных сценариев
        const resultType = Math.floor(Math.random() * 5);
        
        switch (resultType) {
          case 0: // Успешно
            setStatus("success");
            localStorage.setItem("videoVerified", "true");
            
            toast({
              title: "Верификация успешна",
              description: "Вы успешно прошли проверку",
            });
            
            setTimeout(() => {
              onClose();
            }, 2000);
            break;
            
          case 1: // Дубликат в другом профиле
            setStatus("duplicate");
            setDuplicatePhone("+7999***01-74");
            break;
            
          case 2: // Обнаружено фото вместо живого лица
            setStatus("fake_detected");
            setBlockReason("Обнаружено фото на экране вместо живого лица");
            break;
            
          case 3: // Обнаружена гримаса
            setStatus("grimace_detected");
            setBlockReason("Обнаружены изменения лица или гримасы");
            break;
            
          case 4: // Блокировка
            setStatus("blocked");
            setBlockReason("Нарушены правила прохождения проверки");
            break;
            
          default:
            setStatus("error");
            break;
        }
      }, 3000);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-600";
      case "duplicate":
      case "grimace_detected":
        return "bg-amber-100 text-amber-600";
      case "fake_detected":
      case "blocked":
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <Check className="h-8 w-8" />;
      case "duplicate":
        return <Info className="h-8 w-8" />;
      case "fake_detected":
        return <Smartphone className="h-8 w-8" />;
      case "grimace_detected":
        return <AlertCircle className="h-8 w-8" />;
      case "blocked":
        return <ShieldAlert className="h-8 w-8" />;
      case "error":
        return <AlertCircle className="h-8 w-8" />;
      default:
        return <Check className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Видеопроверка</h3>
        <p className="text-sm text-gray-500 mb-4">
          {status === "initial" && "Для завершения входа необходимо пройти проверку лица"}
          {status === "instructions" && "Следуйте инструкциям для проверки"}
          {status === "capturing" && "Поместите лицо в кадр"}
          {status === "scanning" && "Оставайтесь неподвижно, идет сканирование"}
          {status === "processing" && "Видео отправлено на проверку, данные обновятся через несколько секунд"}
        </p>
      </div>
      
      <div className="rounded-lg overflow-hidden bg-gray-100 relative">
        {/* Начальное состояние */}
        {status === "initial" && (
          <div className="h-[280px] flex items-center justify-center flex-col">
            <Camera size={48} className="text-gray-400 mb-4" />
            <Button onClick={startInstructions} className="flex items-center gap-2">
              <Camera size={16} />
              Начать проверку
            </Button>
          </div>
        )}
        
        {/* Инструкции */}
        {status === "instructions" && (
          <div className="h-[280px] p-4 flex flex-col items-center justify-center">
            <h4 className="font-medium text-center mb-4">Для успешной проверки:</h4>
            <ul className="text-sm space-y-2 text-left mb-4">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>Используйте хорошее освещение</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>Смотрите прямо в камеру</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>Снимите очки и головной убор</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>Не используйте фотографии на экране</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>Не искажайте лицо гримасами</span>
              </li>
            </ul>
            <Button onClick={startCamera} className="flex items-center gap-2">
              Продолжить
            </Button>
          </div>
        )}
        
        {/* Захват видео */}
        {(status === "capturing" || status === "scanning") && (
          <div className="relative">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-full h-[280px] object-cover"
            />
            
            {faceDetected && status === "capturing" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-green-500/20 border-2 border-green-500 rounded-full w-36 h-36 flex items-center justify-center">
                  <Check className="text-green-500" size={48} />
                </div>
              </div>
            )}
            
            {status === "scanning" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{ width: `${circleSize}%`, height: `${circleSize}%`, maxWidth: '280px', maxHeight: '280px' }}
                >
                  {/* Анимация сканирующей линии */}
                  <div 
                    className="absolute bg-blue-400/30 w-full h-[10px]"
                    style={{ 
                      top: `${scanProgress}%`,
                      transform: 'translateY(-50%)'
                    }}
                  />
                  
                  {/* Текст с процентом сканирования */}
                  <div className="absolute bottom-4 bg-black/50 px-3 py-1 rounded-full text-white text-xs">
                    Сканирование: {Math.min(Math.round(scanProgress), 100)}%
                  </div>
                </div>
              </div>
            )}
            
            {status === "processing" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Проверка видео...</p>
                  <p className="text-xs mt-2 max-w-[250px]">Видео отправлено на проверку, данные обновятся через несколько секунд</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Результаты проверки */}
        {(status === "success" || status === "error" || status === "duplicate" || 
          status === "fake_detected" || status === "grimace_detected" || status === "blocked") && (
          <div className="h-[280px] flex items-center justify-center flex-col p-4">
            <div className={`rounded-full p-3 mb-3 ${getStatusColor()}`}>
              {getStatusIcon()}
            </div>
            
            <h4 className="text-lg font-medium">
              {status === "success" && "Проверка пройдена"}
              {status === "duplicate" && "Обнаружен дубликат"}
              {status === "fake_detected" && "Обнаружена подделка"}
              {status === "grimace_detected" && "Обнаружены изменения лица"}
              {status === "blocked" && "Аккаунт заблокирован"}
              {status === "error" && "Ошибка проверки"}
            </h4>
            
            <p className="text-sm text-gray-500 text-center mt-2">
              {status === "success" && "Вы успешно прошли верификацию"}
              {status === "duplicate" && (
                <>
                  У вас есть другой профиль с пройденной проверкой
                  {duplicatePhone && (
                    <span className="block font-medium mt-1">{duplicatePhone}</span>
                  )}
                </>
              )}
              {(status === "fake_detected" || status === "grimace_detected" || status === "blocked") && (
                <>
                  <span className="block text-red-600 font-medium">Причина блокировки:</span>
                  <span className="block mt-1">{blockReason}</span>
                </>
              )}
              {status === "error" && "Не удалось выполнить проверку. Пожалуйста, попробуйте снова."}
            </p>
            
            {status === "error" && (
              <Button variant="outline" onClick={startCamera} className="mt-3">
                Повторить
              </Button>
            )}
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
      
      {status === "capturing" && faceDetected && (
        <Button onClick={startScanAnimation} className="w-full">
          Пройти проверку
        </Button>
      )}
      
      {status !== "capturing" && status !== "scanning" && status !== "processing" && status !== "success" && (
        <Button variant="outline" onClick={onClose} className="w-full">
          Закрыть
        </Button>
      )}
    </div>
  );
};

export default VideoVerification;
