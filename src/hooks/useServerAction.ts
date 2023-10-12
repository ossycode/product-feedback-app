// import { useEffect, useRef, useState, useTransition } from "react";

// export function useServerAction(action, onFinished = null) {
//   const [isPending, startTransition] = useTransition();
//   const [result, setResult] = useState(null);
//   const [finished, setFinished] = useState(false);
//   const resolver = useRef(null);

//   useEffect(() => {
//     if (!finished) return;

//     if (onFinished) onFinished(result);
//     resolver.current(result);
//   }, [result, finished, onFinished]);

//   const runAction = async (args: unknown) => {
//     startTransition(async () => {
//       var data = await action(args);

//       setResult(data);
//       setFinished(true);
//     });

//     return new Promise((resolve, reject) => {
//       resolver.current = resolve;
//     });
//   };

//   return [runAction, isPending];
// }