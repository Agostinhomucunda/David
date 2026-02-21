import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const mainBtn = document.getElementById('main-btn');
const toggleForm = document.getElementById('toggle-form');
const nomeInput = document.getElementById('reg-nome');
let isLogin = true;

toggleForm.onclick = () => {
    isLogin = !isLogin;
    nomeInput.style.display = isLogin ? 'none' : 'block';
    document.getElementById('form-title').innerText = isLogin ? 'Iniciar Sessão' : 'Criar Conta';
    mainBtn.innerText = isLogin ? 'ENTRAR' : 'CADASTRAR';
};

mainBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nome = nomeInput.value;

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "dashboard.html";
        } else {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", res.user.uid), {
                nome: nome,
                email: email,
                saldo: 0,
                pontos: 0,
                lucro: 0,
                investimentoAtivo: false,
                valorInvestido: 0,
                dataInvestimento: null,
                uid: res.user.uid
            });
            alert("Conta criada com sucesso!");
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        alert("Erro: " + error.message);
    }
};
