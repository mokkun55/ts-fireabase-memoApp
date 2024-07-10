

function Login() {

  return (
    <div className="text-center m-4 p-4 rounded bg-red-100">
      <p className="text-xl">ログインをして同期機能を使おう!!</p>
      <button
        className="border p-2 bg-blue-600 hover:bg-blue-700 rounded mt-2 text-white"
        onClick={loginWithGoogle}
      >
        googleでログインする
      </button>
    </div>
  );
}

export default Login;
