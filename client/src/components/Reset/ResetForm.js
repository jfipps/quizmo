import React from "react";

export default function ResetForm() {
  return (
    <>
      <section className="ResetForm">
        <form id="resetform">
          <label>Reset Password</label>
          <div className="Labels">
            <input type="text" name="email" placeholder="Email" />
          </div>
        </form>
      </section>
    </>
  );
}
