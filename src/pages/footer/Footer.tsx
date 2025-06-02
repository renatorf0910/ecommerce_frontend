export default function Footer() {
    return (
      <footer className="text-center text-sm text-gray-500 py-6 mt-auto">
        <div>© {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</div>
        <div id="contact" className="mt-2">
          Email: contato@minhaloja.com | WhatsApp: (11) 99999-9999
        </div>
      </footer>
    );
  }
  