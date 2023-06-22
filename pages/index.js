import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Button from '@nextui-org/react/button';

export default function Home() {
  const [myCompanyInput, setMyCompanyInput] = useState("");
  const [myNameInput, setMyNameInput] = useState("");
  const [reCompanyInput, setReCompanyInput] = useState("");
  const [reNameInput, setReNameInput] = useState("");
  const [emailBodyInput, setEmailBodyInput] = useState("");
  // const [purposeInput, setPurposeInput] = useState("");
  // const [questionInput, setQuestionInput] = useState("");
  const [introInput, setIntroInput] = useState(true);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myCompanyText: myCompanyInput,
          myNameText: myNameInput,
          reCompanyText: reCompanyInput,
          reNameText: reNameInput,
          emailBodyText: emailBodyInput,
          // purposeText: purposeInput,
          // questionText: questionInput,
          introFlag: introInput,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log(data.result);
      setResult(data.result);
      // setMyCompanyInput("");
      // setMyNameInput("");
      // setReCompanyInput("");
      // setReNameInput("");
      // setPurposeInput("");
      // setQuestionInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <style jsx global>{`body {background-color: #F0F2F1;}`}</style>
      <Head>
        <title>Morse Toss</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <Button>Click me</Button>
        {/* <img src="/logo.png" className={styles.icon} /> */}
        <h3>
          비즈니스 영문 이메일을 빠르게 작성하세요~!
        </h3>
        <div className={styles.box_container}>
          <div className="box">
            <form onSubmit={onSubmit}>
              <h5>작성자 회사명</h5>
              <input
                type="text"
                name="myCompany"
                placeholder="회사 이름"
                value={myCompanyInput}
                onChange={(e) => setMyCompanyInput(e.target.value)}
              />
              <h5>작성자 이름 <span className={styles.req}>*</span></h5>
              <input required
                type="text"
                name="myName"
                placeholder="작성자 이름"
                value={myNameInput}
                onChange={(e) => setMyNameInput(e.target.value)}
              />
              <h5>수신자 회사명</h5>
              <input
                type="text"
                name="reCompany"
                placeholder="회사 이름"
                value={reCompanyInput}
                onChange={(e) => setReCompanyInput(e.target.value)}
              />
              <h5>수신자 이름 <span className={styles.req}>*</span></h5>
              <input required
                type="text"
                name="reName"
                placeholder="수신자 이름"
                value={reNameInput}
                onChange={(e) => setReNameInput(e.target.value)}
              />
              <h5>내용 <span className={styles.req}>*</span></h5>
              <textarea
                required
                rows="20"
                name="emailBody"
                placeholder="목적이나 질문을 작성하세요."
                value={emailBodyInput}
                onChange={(e) => setEmailBodyInput(e.target.value)}
              />
              {/* <h5>질문</h5>
              <textarea
                rows="10"
                type="text"
                name="question"
                placeholder="질문을 입력하세요."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              /> */}
              <div>
                <input
                  type="checkbox"
                  checked={introInput}
                  name="intro"
                  onChange={(e) => setIntroInput(e.target.value)}/>인사말 추가
              </div>
              <input type="submit" value="영문 이메일 생성" />
            </form>
          </div>
          <div className="box">
            <h5>영문 이메일 결과</h5>
            <textarea
              disabled
              rows="48"
              className={styles.result}
              value={result}
            ></textarea>
          </div>
        </div>
      </main>
    </div>
  );
}
