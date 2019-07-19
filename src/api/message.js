import { fetch } from "./fetch";
export function getMessage(data) {
  return fetch({
    method: "post",
    url: "/getMessage",
    data
  });
}
export function getMesCount(data) {
  return fetch({
    method: "post",
    url: "/getMesCount",
    data
  });
}
export function deleteMes(data) {
  return fetch({
    method: "post",
    url: "/deleteMes",
    data
  });
}
export function getMessageList(data) {
  return fetch({
    method: "post",
    url: "/getMessageList",
    data
  });
}
export function changeMesState(data) {
  return fetch({
    method: "post",
    url: "/changeMesState",
    data
  });
}
export function setAllMesRead(data) {
  return fetch({
    method: "post",
    url: "/setAllMes",
    data
  });
}
export function deleteAllMes(data) {
  return fetch({
    method: "post",
    url: "/deleteAllMes",
    data
  });
}
export function inviteMessage(data) {
  return fetch({
    method: "post",
    url: "/inviteMessage",
    data,
    modalShow: true
  });
}
export function agreeInvite(data) {
  return fetch({
    method: "post",
    url: "/agreeInvite",
    data
  });
}
export function refuseInvite(data) {
  return fetch({
    method: "post",
    url: "/refuseInvite",
    data
  });
}
