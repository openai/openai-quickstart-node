import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const animal = req.body.animal || "";
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid sales query",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0,
    });
    console.log(completion.data.choices);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(animal) {
  return `You are sql expert. Given the following table structure,
 answer the question using only that information,
  outputted in markdown format. If you are unsure , say
  Sorry, I don't know how to help with that.

  Table structure:
  CREATE TABLE [dbo].[ZSSR_TABLE_2022](
        [Zone] [nvarchar](10) NULL,
        [MYKSState] [nvarchar](55) NULL,
        [DivisionCode] [nvarchar](2) NULL,
        [Division] [varchar](9) NULL,
        [INVOICEDATE] [datetime] NULL,
        [Plant] [nvarchar](4) NULL,
        [Sales Off] [nvarchar](4) NULL,
        [Sales Office Desc] [nvarchar](20) NULL,
        [CUSTOMER] [nvarchar](10) NULL,
        [CUSTOMER NAME] [nvarchar](35) NULL,
        [Cust SO] [nvarchar](4) NULL,
        [Quotation] [nvarchar](10) NULL,
        [Quot.Qty] [numeric](15, 3) NULL,
        [Sales Order] [nvarchar](10) NULL,
        [Sales.Qty] [numeric](13, 3) NULL,
        [Inv No] [nvarchar](10) NULL,
        [ITEM] [int] NULL,
        [Order Type] [nvarchar](4) NULL,
        [Order Type Desc] [nvarchar](20) NULL,
        [Material] [nvarchar](18) NULL,
        [MaterialDesc] [nvarchar](40) NULL,
        [Quantity] [numeric](13, 3) NULL,
        [UOM] [nvarchar](3) NULL,
        [Ex_Factory] [numeric](13, 2) NULL,
        [ZSPA] [numeric](17, 6) NULL,
        [ZSPA_Value] [numeric](15, 2) NULL,
        [ZPRC] [numeric](17, 6) NULL,
        [ZPRC_Value] [numeric](15, 2) NULL,
        [ValDscVal] [numeric](15, 2) NULL,
        [Value Dsc%] [numeric](17, 6) NULL,
        [NPriceDisc] [numeric](17, 2) NULL,
        [BED] [numeric](13, 2) NULL,
        [ExciseDuty] [numeric](21, 5) NULL,
        [Addl Ed] [numeric](13, 2) NULL,
        [Net Value] [numeric](19, 2) NULL,
        [Cash_DSC] [numeric](17, 6) NULL,
        [Cash_DSC_Value] [numeric](15, 2) NULL,
        [ValBforTAX] [numeric](20, 2) NULL,
        [NettSale] [numeric](24, 5) NULL,
        [VAT] [numeric](13, 2) NULL,
        [VATTaxCode] [nvarchar](2) NULL,
        [CST] [numeric](13, 2) NULL,
        [CSTTaxCode] [nvarchar](2) NULL,
        [CessValVAT] [numeric](17, 6) NULL,
        [CESS%VAT] [numeric](13, 2) NULL,
        [CESSValCST] [numeric](13, 2) NULL,
        [CESS%CST] [numeric](17, 6) NULL,
        [CESSCSTTaxCode] [nvarchar](2) NULL,
        [CESSBASE] [numeric](13, 2) NULL,
        [CESS%BASE] [numeric](15, 6) NULL,
        [CESSBASETaxCode] [nvarchar](2) NULL,
        [FriVal] [numeric](13, 2) NULL,
        [Frieght%] [numeric](15, 6) NULL,
        [ZOCT] [numeric](15, 6) NULL,
        [ZOCT Value] [numeric](13, 2) NULL,
        [OCTTaxCode] [nvarchar](2) NULL,
        [Tot Val] [numeric](32, 6) NULL,
        [ZORC] [numeric](15, 6) NULL,
        [ZORC Value] [numeric](13, 2) NULL,
        [EmpID] [int] NULL,
        [EmpFName] [nvarchar](25) NULL,
        [EmpLName] [nvarchar](25) NULL,
        [Customer City] [nvarchar](35) NULL,
        [District Code] [nvarchar](6) NULL,
        [District] [nvarchar](20) NULL,
        [Customer State] [nvarchar](20) NULL,
        [ABC Class] [nvarchar](2) NULL,
        [Prod Grp] [nvarchar](2) NULL,
        [ProdGrp] [nvarchar](20) NULL,
        [ProdSubgrp] [nvarchar](10) NULL,
        [Prod Subgrp] [nvarchar](20) NULL,
        [Prod Code] [nvarchar](5) NULL,
        [Mat Desc] [nvarchar](40) NULL,
        [TIN No] [nvarchar](40) NULL
);
  Question :  ${animal}`;
}
