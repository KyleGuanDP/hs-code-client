import "./Detail.css";
import { Descriptions } from "antd";

export default function Details(props) {
  const { data } = props;
  const detail = data.goods;
  const declareElements = detail.declareElements;
  const declareElementsSplit = declareElements.split(";");
  console.log("declareElementsSplit:", declareElementsSplit);
  const declareElementsItems = declareElementsSplit.map((item) => {
    const [key, value] = item.split(":");
    return {
      label: key,
      children: value,
      span: 3,
    };
  });

  const basic = [
    {
      label: "商品编码",
      children: detail.hsCode,
      span: 3,
    },
    {
      label: "商品名称",
      span: 3,
      children: detail.goodsName,
    },
    {
      label: "商品描述",
      span: 3,
      children: detail.goodsDescription ? detail.goodsDescription : "-",
    },
    {
      label: "编码状态",
      span: 3,
      children: detail.goodsCodeStatus ? detail.goodsCodeStatus : "-",
    },
    {
      label: "更新时间",
      span: 3,
      children: detail.goodsUpdateTime ? detail.goodsUpdateTime : "-",
    },
  ];

  const taxInfo = [
    {
      label: "计量单位1",
      children: detail.unitLegal1 ? detail.unitLegal1 : "-",
      span: 3,
    },
    {
      label: "计量单位2",
      children: detail.unitLegal2 ? detail.unitLegal2 : "-",
      span: 3,
    },
    {
      label: "出口税率",
      children: detail.rateExportDuty ? detail.rateExportDuty : "-",
      span: 3,
    },
    {
      label: "出口退税税率",
      children: detail.rateExportRebate ? detail.rateExportRebate : "-",
      span: 3,
    },
    {
      label: "增值税率",
      children: detail.rateVat ? detail.rateVat : "-",
      span: 3,
    },
    {
      label: "最惠国税率",
      children: detail.rateMfnImport ? detail.rateMfnImport : "-",
      span: 3,
    },
    {
      label: "进口暂定税率",
      children: detail.rateProvisional ? detail.rateProvisional : "-",
      span: 3,
    },
    {
      label: "进口普通税率",
      children: detail.rateGeneralImport ? detail.rateGeneralImport : "-",
      span: 3,
    },
    {
      label: "消费税率",
      children: detail.rateExcise ? detail.rateExcise : "-",
      span: 3,
    },
  ];

  {
    return (
      <div
        className="container-detail"
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="row basic-info">
          <div className="content">
            <Descriptions
              bordered
              title="基本信息"
              items={basic}
              size="large"
            />
          </div>
        </div>
        <div className="row tax-info">
          <div className="content">
            <Descriptions
              bordered
              title="税率信息"
              items={taxInfo}
              size="large"
            />
          </div>
        </div>
        <div className="row element-info">
          <div className="content">
            <Descriptions
              bordered
              title="申报要素"
              items={declareElementsItems}
              size="large"
            />
          </div>
        </div>
        <div className="row negotiated-rate-info">
          <div className="content"></div>
        </div>
        <div className="row RCEP-info">
          <div className="content"></div>
        </div>
      </div>
    );
  }
}
