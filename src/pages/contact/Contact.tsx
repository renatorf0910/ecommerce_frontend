import { FiMail, FiMessageCircle, FiPhone, FiSmartphone } from "react-icons/fi";

export default function Contact() {
    return (
        <section className="min-h-screen w-full bg-gradient-to-r from-blue-100 to-white flex flex-col justify-center items-center text-gray-800 px-6 py-16">
            <h1 className="text-4xl font-extrabold mb-12 text-blue-800 drop-shadow-md text-center">
                Contato
            </h1>
            <div className="flex justify-center gap-16 w-full max-w-4xl">
                <div className="flex items-center space-x-4 border-l-4 border-green-500 pl-4 hover:bg-green-50 transition rounded-md cursor-pointer max-w-xs">
                    <FiPhone className="text-green-600 w-7 h-7 flex-shrink-0" />
                    <span className="font-semibold">(12) 99175-2296</span>
                    <a
                        href="https://wa.me/5512991752296"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center space-x-2 text-green-600 hover:underline"
                    >
                        <FiSmartphone className="w-6 h-6" />
                        <span className="font-medium">WhatsApp</span>
                    </a>
                </div>
                <div className="flex items-center space-x-4 border-l-4 border-red-500 pl-4 hover:bg-red-50 transition rounded-md cursor-pointer max-w-xs">
                    <FiMail className="text-red-600 w-7 h-7 flex-shrink-0" />
                    <a
                        href="mailto:renatorf0910@gmail.com"
                        className="font-semibold hover:underline text-red-700"
                    >
                        renatorf0910@gmail.com
                    </a>
                </div>
            </div>
            <div className="mt-16 text-center">
                <button
                    disabled
                    className="inline-flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    title="Funcionalidade de chat em desenvolvimento"
                >
                    <FiMessageCircle className="w-7 h-7" />
                    <span>Chat (em breve)</span>
                </button>
            </div>
        </section>
    );
}
