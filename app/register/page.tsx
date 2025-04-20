import Image from "next/image";
import { Icon } from "@iconify/react";
import RegisterForm from "../ui/register/register-form";
export default function Register() {
  return (
    <div>
      <div className="flex justify-between pt-10 px-30 border-b">
        <div>
          <Image src="../../public/next.svg" alt="sda" width={10} height={10} />
        </div>
        <div className="flex gap-4 ">
          <Icon icon="twemoji:flag-indonesia" className="w-5 h-5" />
          <Icon icon="ri:question-fill" className="w-5 h-5" />
        </div>
      </div>
      <div>
        <RegisterForm/>
      </div>
    </div>
  );
}
