import { auth, db } from "./firebase.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

auth.onAuthStateChanged(user => {
    if (user) {
        // Monitora dados em tempo real
        onSnapshot(doc(db, "users", user.uid), (doc) => {
            const data = doc.data();
            document.getElementById('user-name').innerText = data.nome;
            document.getElementById('saldo-txt').innerText = data.saldo.toLocaleString() + " Kz";
            document.getElementById('pontos-txt').innerText = data.pontos;
            document.getElementById('lucro-txt').innerText = "+" + (data.investimentoAtivo ? "35%" : "0%");
            
            // Configura o botão de convite com o UID
            document.getElementById('btn-invite').onclick = () => {
                navigator.clipboard.writeText(user.uid);
                alert("Código de Convite Copiado: " + user.uid);
            };
        });
    } else {
        window.location.href = "index.html";
    }
});

window.logout = () => {
    signOut(auth).then(() => window.location.href = "index.html");
};
