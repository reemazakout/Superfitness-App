import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function ChatAi() {
  // Translation
  const { t } = useTranslation();

  const [message, setMessage] = useState([
    {
      content: {
        parts: [
          {
            text: "AI learns patterns from data to make predictions or decisions.\n",
          },
        ],
        role: "model",
      },
    },
  ]);

  const onSubmit = async (e: FormDataEvent) => {
    try {
      e.preventDefault();
      if (!e.target[0].value) return;
      setMessage([
        ...message,
        {
          content: {
            parts: [
              {
                text: e.target[0].value,
              },
            ],
            role: "user",
          },
        },
      ]);

      // Call Ai
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_URL_GEMNAI,
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": import.meta.env.VITE_API_KEY,
        },
        data: {
          contents: [
            {
              parts: [
                {
                  text:
                    "you're fitness trainer and your answer maximum in just two rows" +
                    e.target[0].value,
                },
              ],
            },
          ],
        },
      }).catch((err) => {
        console.log(err);
      });
      const { candidates } = data;

      setMessage((prev) => [
        ...prev,
        {
          content: {
            parts: [
              {
                text: candidates[0].content.parts[0].text,
              },
            ],
            role: "model",
          },
        },
      ]);

      e.target[0].value = "";
    } catch (error) {
      toast.error(t("something-went-wrong"));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed bottom-5 right-5 flex flex-col items-center hover:cursor-pointer z-10  ">
          <img
            className=" before:content-[''] before:absolute before:w-full before:h-full before:bg-flame "
            src="src\assets\images/ChatAi/robot.png"
            width={150}
            alt="robot"
          />
          <span className="bg-flame !shadow-[20px_20px_120px_20px] !drop-shadow-2xl !shadow-flame px-4 py-2 rounded-full ">
            {t("Hey Ask Me")}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className=" flex flex-col justify-between h-2/3 sm:max-w-[425px] bg-ChatAi-bg bg-cover bg-center border-flame before:border-flame before:content-[''] before:absolute before:w-full before:h-full before:backdrop-blur-[12.5px] before:bg-[#1A1A1A80] rounded-xl before:rounded-xl before:top-0 before:left-0">
        <DialogHeader className=" relative z-10">
          <DialogTitle>{t("Smart coach")}</DialogTitle>
        </DialogHeader>

        <div className="relative z-10 overflow-y-auto scrollbar-none flex flex-col gap-2 h-full">
          {message.map((item, index) => (
            <div
              key={index}
              className={item.content.role == "model" ? "flex  justify-start" : "flex  justify-end"}
            >
              <div className={" flex justify-end gap-1 w-3/4"}>
                {item.content.role == "model" && (
                  <div className="bg-model-bg w-16 h-9 bg-center bg-cover rounded-full"></div>
                )}
                <span
                  className={
                    item.content.role == "model"
                      ? "rounded-2xl rounded-tl-none  p-2 bg-[#24242480]"
                      : "rounded-2xl rounded-tr-none  p-2 bg-[#FF6A0080]"
                  }
                >
                  {item.content.parts[0].text}
                </span>
                {item.content.role != "model" && (
                  <div className="bg-human-bg w-9 h-9 bg-center bg-cover rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="w-full">
          <form
            onSubmit={onSubmit}
            className="flex w-full z-10 justify-center gap-2 align-items-center"
          >
            <Input name="message" placeholder={t("Ask Me Any Things")} className=" border-white" />
            <Button type="submit">Send</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
