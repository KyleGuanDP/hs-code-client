import { Input, Table } from "antd";
import "./App.css";
import { useEffect, useState } from "react";

const { Search } = Input;

function App() {
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);

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
      render: () => <a>详情</a>,
    },
  ];

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
      <Search
        placeholder="请输入商品编码或名称"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={data} scroll={{ x: 1200, y: 300 }} />

      {result?.goods && (
        <div style={{ marginTop: 20 }}>
          <div>HS Code: {result.goods.hsCode}</div>
          <div>Name: {result.goods.name}</div>
        </div>
      )}
    </div>
  );
}

export default App;
