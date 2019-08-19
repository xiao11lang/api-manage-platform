import axios from 'axios'
import {config} from './config'
import {Modal} from 'antd'
export function fetch(options) {
    return new Promise((resolve, reject) => {
      const instance = axios.create({
        baseURL: config.baseUrl,
        timeout: config.timeout,
        headers:{
          Authorization:`Bearer ${sessionStorage.getItem('api_master_token')}`
        }
      });
      instance.interceptors.response.use(
        response => {
          let data;
          // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
          if (response.data === undefined) {
            data = response.request.responseText;
          } else {
            data = response.data;
          }
          if(response.config.modalShow){
            Modal.success({
              title:data.detail,
              centered:true
            })
          }
          if(response.config.interceptor&&typeof response.config.interceptor==='function'){
            console.log(response.config);
            data=response.config.interceptor(data)
          }
          return data;
        },
        err => {
          // 根据接口返回状态吗来统一处理报错
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                err.message = '请求错误';
                break;
  
              case 401:
                err.message = '未授权，请登录';
                break;
  
              case 403:
                err.message = err.response.data && err.response.data.detail;
                break;
  
              case 404:
                err.message = '未找到查询对象';
                break;
  
              case 408:
                err.message = '请求超时';
                break;
  
              case 500:
                err.message = '服务器出错,请稍后再试';
                break;
  
              case 501:
                err.message = '服务未实现';
                break;
  
              case 502:
                err.message = '网关错误';
                break;
  
              case 503:
                err.message = '服务不可用';
                break;
  
              case 504:
                err.message = '网关超时';
                break;
  
              case 505:
                err.message = 'HTTP版本不受支持';
                break;
  
              default:
            }
          }
          if (err.response && err.response.data && err.response.data.detail) {
            Modal.error({
              title:'错误',
              content:err.response.data.detail,
              onOk:function(){
                if(err.response&&err.response.status===401){
                  window.location.assign('/')
                }
              }
            });
          } else {
            Modal.error({
              title:'错误',
              content:err.message,
              onOk:function(){
                if(err.response&&err.response.status===401){
                  window.location.assign('/')
                }
              }
            });
          }
          return Promise.reject(err.response && err.response.data); // 返回接口返回的错误信息
        }
      );
      instance(options)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }