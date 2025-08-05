import TemplateList from "./components/TemplateList";
import Title from "./components/Title";
import CreateTrialForm from "./components/CreateTrialForm";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export default function CreateTrial() {
  const [isListOpen, setIsListOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(true);

  return (
    <div className="w-full py-20 flex flex-col justify-center items-center overflow-r-hidden relative min-h-screen">
      <div className="w-full max-w-282 px-4 flex gap-6 max-xl:flex-col max-xl:items-center">
        <div className="w-2/5 max-xl:w-full max-w-175">
          <Title></Title>

          <div className="flex flex-col gap-2 max-xl:w-full overflow-y-hidden scroll-auto overscroll-y-auto">
            <div
              className="flex items-center gap-2 justify-between py-4 cursor-pointer xl:hidden xl:pointer-events-none"
              onClick={() => setIsListOpen(!isListOpen)}
            >
              <div className="flex items-center gap-2">
                <span className="size-9 rounded-full border-1 border-schema-outline flex justify-center items-center">
                  1
                </span>
                <h4 className="text-h4">選擇訓練模板</h4>
              </div>

              <IoIosArrowDown
                className={`${isListOpen ? "rotate-180" : ""}`}
              ></IoIosArrowDown>
            </div>
            <TemplateList
              className={`${isListOpen ? "h-fit" : "max-xl:hidden"}`}
            ></TemplateList>
          </div>
        </div>

        <div className="w-3/5 flex flex-col gap-2 max-xl:w-full max-w-175 xl:self-start xl:sticky xl:top-40">
          <div
            className="flex items-center gap-2 justify-between py-4 cursor-pointer xl:hidden xl:pointer-events-none"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <div className="flex items-center gap-2">
              <span className="size-9 rounded-full border-1 border-schema-outline flex justify-center items-center">
                2
              </span>
              <h4 className="text-h4">填寫客製內容</h4>
            </div>

            <IoIosArrowDown
              className={`${isFormOpen ? "rotate-180" : ""}`}
            ></IoIosArrowDown>
          </div>
          <CreateTrialForm
            className={`${isFormOpen ? "h-fit" : "max-xl:hidden"}`}
          ></CreateTrialForm>
        </div>
      </div>
    </div>
  );
}
