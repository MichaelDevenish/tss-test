import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RecoilSync, RecoilURLSyncJSON } from "recoil-sync";
import App from "./pages/Index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilURLSyncJSON storeKey="url" location={{ part: "queryParams" }}>
        <RecoilSync
          storeKey="local"
          read={(itemKey) => {
            const item = window.localStorage.getItem(itemKey);
            return item ? JSON.parse(item) : null;
          }}
          write={({ diff }) => {
            diff.forEach((value, key) => {
              window.localStorage.setItem(key, JSON.stringify(value));
            });
          }}
        >
          <App />
        </RecoilSync>
      </RecoilURLSyncJSON>
    </RecoilRoot>
  </React.StrictMode>
);
