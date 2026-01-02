import { Input, Table, Button } from "antd";
import "./App.css";
import { useEffect, useState } from "react";
import Detail from "./Detail.jsx";

const { Search } = Input;

function App() {
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {}, []);

  const columns = [
    {
      title: "商品编码",
      dataIndex: "code",
      key: "code",
      width: 120,
      fixed: "left",
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      width: 160,
      fixed: "left",
    },
    { title: "计量单位", dataIndex: "unit", key: "unit", width: 120 },
    { title: "出口退税率(%)", dataIndex: "trr", key: "trr", width: 140 },
    { title: "监管条件", dataIndex: "condition", key: "condition", width: 140 },
    { title: "检验检疫", dataIndex: "iaq", key: "iaq", width: 140 },
    {
      title: "详情",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        console.log("render operation for:", record.code);
        return <a onClick={() => onDetail(record)}>详情</a>;
      },
    },
  ];
  // 返回
  const onBack = () => {
    setIndex(0);
    setResult(null);
  };
  // 详情
  const onDetail = (record) => {
    const code = record.code;
    console.log("fetch detail for code:", code);
    fetch(`/api/details?hsCode=${encodeURIComponent(code)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("detail response:", data);
        setResult(data);
        setIndex(1);
      })
      .catch(console.error);
  };
  // 搜索
  const onSearch = (value) => {
    if (!value) {
      setData([]);
    }
    fetch(`/api/search?hsCode=${encodeURIComponent(value)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("response:", data.goodsList);
        const goods = data.goodsList;
        let rows = [];
        for (const good of goods) {
          rows.push({
            code: good.hsCode,
            name: good.goodsName,
            unit: good.unitLegal1,
            trr: good.rateExportRebate,
            condition: good.customsSupervision,
            iaq: good.ciqCategory,
          });
        }
        setData(rows);
      })
      .catch(console.error);
  };

  return (
    <div className="App">
      {index === 1 && (
        <div
          style={{
            width: "80%",
            marginBottom: 20,
            justifyContent: "flex-start",
          }}
        >
          <Button type="primary" onClick={onBack} className="back-button">
            返回
          </Button>
        </div>
      )}
      <Search
        placeholder="请输入商品编码或名称"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width: "80%", marginBottom: "30px" }}
      />

      {index === 1 && <Detail data={result} />}

      {index === 0 && (
        <Table
          rowKey="code"
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200, y: 300 }}
          style={{ width: "80%" }}
        />
      )}
    </div>
  );
}

export default App;
