import "@/styles/globals.scss";
import { inter } from "@/utils/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <style jsx global>{`
          * {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />;
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
          closeButton={false}
          // closeButton={
          //   <button type="button" className="focus:outline-none">
          //     <CloseIcon width={24} height={24} color="#A7ABC1" />
          //   </button>
          // }
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  );
}
