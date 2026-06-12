import { useState } from "react";
import BookList from "./BookList";
import AuthorList from "./AuthorList";
import LeakDemo from "./demos/LeakDemo";
import SafeDemo from "./demos/SafeDemo";

export default function App() {
  const [showLeak, setShowLeak] = useState(false);
  const [showSafe, setShowSafe] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <h1>책 목록 (5단계 — 언마운트 실험)</h1>
      <BookList />

      <h1>저자 목록</h1>
      <AuthorList />

      <hr style={{ margin: "24px 0" }} />

      <h2>실험: LeakDemo (cancelled 없음)</h2>
      <button onClick={() => setShowLeak(!showLeak)}>
        {showLeak ? "숨기기" : "보이기"}
      </button>
      {showLeak && <LeakDemo />}

      <h2>실험: SafeDemo (cancelled 있음)</h2>
      <button onClick={() => setShowSafe(!showSafe)}>
        {showSafe ? "숨기기" : "보이기"}
      </button>
      {showSafe && <SafeDemo />}
    </div>
  );
}