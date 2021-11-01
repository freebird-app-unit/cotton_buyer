import React from 'react'
var baseUrl=['abc'];
var fontSizeMyPostCenterText=11;
var vLineMyPostStyle={borderColor:'#D1D1D1',borderWidth:0.5,marginLeft:3,marginRight:3,height:'100%'};

const changeBaseUrl = (baseURL) => {
  baseUrl[0]=baseURL;
  console.log('latest url', baseUrl);
};

const Global = {
  changeBaseUrl,
  baseUrl,
  fontSizeMyPostCenterText,
  vLineMyPostStyle,
};

module.exports = Global;
