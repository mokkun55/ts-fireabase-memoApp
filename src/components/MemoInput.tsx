import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

function MemoInput() {
  const [memoInput, setMemoInput] = useState<string>("");
  const [titleInput, setTitleInput] = useState<string>("");

  const addMemo = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(`メモ(${titleInput})を追加: ${memoInput}`);

    // -----firebaseにデータを追加する-----

    // htmlの方でrequiredを指定しているので、ここでチェックする必要はない
    // if (!memoInput) {
    //   alert("メモを入力してください");
    //   return;
    // }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("ユーザーIDが取得できませんでした \nログインしてください");
      console.error("ユーザーIDが取得できませんでした");
      return;
    }

    // タイトルが未入力の場合は「無題のメモ」とする
    const memoTitle = titleInput ? titleInput : "無題のメモ";

    // ユーザーのコレクションへの参照を取得
    const userDocRef = doc(db, "users", userId);

    // memosコレクションへの参照を取得
    const memosCollectionRef = collection(userDocRef, "memos");

    await addDoc(memosCollectionRef, {
      title: memoTitle,
      memo: memoInput,
      createdAt: new Date(),
    });

    setTitleInput("");
    setMemoInput("");
  };

  return (
    <div className="bg-blue-100 m-4 p-4 rounded">
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="タイトルを入力してください"
        onChange={(e) => setTitleInput(e.target.value)}
        value={titleInput}
      />
      <form onSubmit={(e) => addMemo(e)}>
        <textarea
          className="border border-gray-300 rounded p-2 w-full resize-none"
          placeholder="メモを入力してください"
          onChange={(e) => setMemoInput(e.target.value)}
          value={memoInput}
          required
          maxLength={280}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full">
          追加
        </button>
      </form>
    </div>
  );
}

export default MemoInput;
