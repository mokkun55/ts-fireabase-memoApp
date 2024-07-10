import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };

  const signout = () => {
    signOut(auth);
  };

  return (
    <div className="bg-gray-100 p-4  flex items-center justify-between">
      <h1 className="text-3xl">React + ts + Firebase MemoApp</h1>
      {user ? (
        <div className="flex items-center">
          <img
            src={user.photoURL ?? ""}
            className="w-[50px] h-[50px] border rounded-xl mr-3"
          />
          <button
            onClick={signout}
            className="border p-2 bg-red-600 hover:bg-red-700 rounded mt-2 text-white"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="border p-2 bg-blue-600 hover:bg-blue-700 rounded mt-2 text-white"
        >
          googleでログイン
        </button>
      )}
    </div>
  );
}

export default Header;
