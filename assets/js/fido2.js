let dw;

(async function () {
  const { browser, directweb } = LoginID;
  const messageElm = document.querySelector(".message");

  try {
    const isFido2Supported = await browser.default.isFido2Supported();

    if (!isFido2Supported) {
      messageElm.textContent = "Fido2 is not supported on your device";
    }

    const res = await fetch("/token/env");
    const { apiKey, baseURI } = await res.json();
    if (!res.ok) throw data;

    dw = new directweb.DirectWeb(baseURI, apiKey);
    console.log(dw);
  } catch (e) {
    console.log(e);
  }
})();
