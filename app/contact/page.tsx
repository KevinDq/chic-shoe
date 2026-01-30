"use client"; // si tu veux un formulaire interactif

import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message envoyé :", message);
    setSent(true);
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Contact</h1>

      {sent && <p className="mb-4 text-green-600">Merci, votre message a été envoyé !</p>}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">          

          {/* Nom */}
          <div>
            <label className="block mb-1 font-medium">
              Nom
            </label>
            <input
              type="text"       
              required
              placeholder="Jean Dupont"
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"            
              required
              placeholder="jean@email.com"
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>     
          <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message"
          className="border border-gray-400 p-2 h-32 w-full"
        />  
        <div className="flex justify-center">
          <button
          type="submit"
          className="bg-[#B8860B] text-white px-4 py-2 hover:opacity-90"
        >
          Envoyer
        </button>
        </div>
        
         </form>

      
        

        
      
    </div>
  );
}
