import React, { useEffect, useRef, useState } from "react";
import BackButton from "../component/BackButton";

const generateMockData = (total = 500) => {
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    sample1: "0000",
    sample2: "0000",
    sample3: "0000",
  }));
};

const PAGE_SIZE = 100;

const ScrollPage: React.FC = () => {
  const allData = useRef(generateMockData());
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollState, setScrollState] = useState({
    atTop: true,
    atBottom: false,
  });
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    setDisplayData(allData.current.slice(0, PAGE_SIZE));
  }, []);

  const updateScrollStatus = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const isScrollable = scrollHeight > clientHeight;
    setCanScroll(isScrollable);

    if (isScrollable) {
      setScrollState({
        atTop: scrollTop < 5,
        atBottom: scrollTop + clientHeight >= scrollHeight - 5,
      });
    } else {
      setScrollState({ atTop: true, atBottom: true });
    }
  };

  useEffect(() => {
    updateScrollStatus();
  }, [displayData]);

  const handleScroll = () => {
    updateScrollStatus();

    if (!containerRef.current || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isBottom && displayData.length < allData.current.length) {
      setLoading(true);
      setTimeout(() => {
        const next = allData.current.slice(
          displayData.length,
          displayData.length + PAGE_SIZE
        );
        setDisplayData((prev) => [...prev, ...next]);
        setLoading(false);
      }, 2000);
    }
  };

  const getMaskImage = () => {
    if (!canScroll) return "none";

    const showTopFade = !scrollState.atTop;
    const showBottomFade =
      !scrollState.atBottom || displayData.length < allData.current.length;

    if (!showTopFade && !showBottomFade) return "none";

    const gradientSize = "50px";

    const topColor = showTopFade ? "transparent" : "black";
    const bottomColor = showBottomFade ? "transparent" : "black";

    return `linear-gradient(to bottom, ${topColor}, black ${gradientSize}, black calc(100% - ${gradientSize}), ${bottomColor})`;
  };
  const maskStyle = {
    maskImage: getMaskImage(),
    WebkitMaskImage: getMaskImage(),
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <BackButton />
      <div className="border border-black rounded-lg bg-white p-6 w-1/2 h-[1/2] shadow-md flex flex-col justify-start">
        <div className="p-6 text-sm">
          <p className="mb-4 font-bold text-gray-700">不確定インジケーター</p>
          <p className="mb-2">
            本画面ではリストを追加取得した際の見た目の表現のサンプルになります。
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>1.リストは初期100件まで表示されます。</li>
            <li>
              2.リストを100件までスクロールすると次の100件を取得＆表示します。
            </li>
          </ul>

          {/* Separate table header */}
          <div className="overflow-hidden">
            <table className="min-w-full border-collapse ">
              <thead className="bg-gray-200 border-black border-2">
                <tr>
                  <th className="border w-1/4 border-black px-2 py-1">
                    サンプルA列
                  </th>
                  <th className="border w-1/4 border-black px-2 py-1">
                    サンプルB列
                  </th>
                  <th className="border w-1/4 border-black px-2 py-1">
                    サンプルC列
                  </th>
                  <th className="border w-1/4 border-black px-2 py-1">
                    サンプルD列
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable body */}
          <div className="border-2 border-black">
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="relative max-h-[400px] overflow-y-auto scroll-smooth"
              style={maskStyle}
            >
              <table className="min-w-full border-collapse relative z-50">
                <tbody>
                  {displayData.map((row) => (
                    <tr key={row.id}>
                      <td className="border w-[25.5%] px-2 py-1 text-center">{`${row.id}`}</td>
                      <td className="border w-[25.5%] px-2 py-1 text-center">
                        {row.sample1}
                      </td>
                      <td className="border w-[25.5%] px-2 py-1 text-center">
                        {row.sample2}
                      </td>
                      <td className="border w-[24%] px-2 py-1 text-center">
                        {row.sample3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPage;
