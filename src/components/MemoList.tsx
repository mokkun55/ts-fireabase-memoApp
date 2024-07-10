import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type Memo = {
  id: string;
  title: string;
  memo: string;
  createdAt: Date;
};

function MemoList() {
  const [memos, setMemos] = useState<Memo[]>([]);

  // ユーザー状態が変化すると再レンダリングする用
  const [user] = useAuthState(auth);

  // ---firebaseからデータを取得する処理---

  // 最初はuntitledになるから "?" をつける
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    console.log("use effect");
    console.log(userId);

    const getMemoData = async (userId: string | undefined) => {
      const memoData = collection(db, `users/${userId}/memos`);
      onSnapshot(query(memoData, orderBy("createdAt", "desc")), (snapshot) => {
        // console.log(snapshot.docs[0].id);
        setMemos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            memo: doc.data().memo,
            createdAt: doc.data().createdAt.toDate(),
          }))
        );
      });
    };

    getMemoData(userId);
  }, [userId, user]);

  // firebaseから削除
  const clickDelete = async (index: number) => {
    console.log(index + " 番目を削除");
    // console.log(memos);

    // deleteDoc(参照元, 削除するもの)
    deleteDoc(doc(db, `users/${userId}/memos`, memos[index].id));
  };

  return (
    <div className="mb-16">
      <h1 className="mx-4 text-2xl ">メモ一覧</h1>
      {memos.map((memo, index) => (
        <div key={index} className="bg-blue-100 mx-4 my-2 p-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="mr-3 font-bold text-xl">{memo.title}</h2>
              <p>{memo.createdAt.toLocaleDateString()}</p>
            </div>
            <button
              className="border p-2 bg-red-600 hover:bg-red-700 rounded mt-1 text-white"
              onClick={() => clickDelete(index)}
            >
              削除
            </button>
          </div>
          <p className="ml-2 mt-2">{memo.memo}</p>
        </div>
      ))}
    </div>
  );
}

export default MemoList;
