export default function Footer() {
    return (
      <footer className="text-center text-sm text-gray-500 py-6 mt-auto">
        <div>© {new Date().getFullYear()} Rounin. Todos os direitos reservados.</div>
        <div id="contact" className="mt-2">
          Email: renatorf0910@gmail.com | WhatsApp: (12) 99175-2296
        </div>
      </footer>
    );
  }
  