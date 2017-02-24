<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Groups extends CI_Model {
  public function __construct(){
    parent::__construct();
  }

  public function getmyGroups(){
    $uid = $this->session->uid;
    $sql = "SELECT groups.id,groups.userid,groups.uniqName FROM groups where groups.userid='$uid'";
    $res = $this->db->query($sql);
    $data = [];
    foreach ($res->result_array() as $value) {
      $data[] = array(
        'id'    => $value["id"],
        'name'  => basename($value["uniqName"]),
        'is_dir'=> 1
      );
    }
    return $data;
  }

  public function getSubGroups(){
    $uid = $this->session->uid;
    $sql = "SELECT groups.id,groups.userid,groups.uniqName FROM groups where groups.id IN (SELECT groupmembers.groupid FROM groupmembers WHERE groupmembers.userid='$uid' AND groups.userid <> '$uid')";
    $res = $this->db->query($sql);
    $data = [];
    foreach ($res->result_array() as $value) {
      $data[] = array(
        'id'    => $value["id"],
        'name'  => basename($value["uniqName"]),
        'is_dir'=> 1
      );
    }
    return $data;
  }

  public function getRestGroups(){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM `groups` WHERE groups.id NOT IN(SELECT groupmembers.groupid FROM groupmembers WHERE groupmembers.userid='$uid') AND isPublic=1";
    $res = $this->db->query($sql);
    $data = [];
    foreach ($res->result_array() as $value) {
      $data[] = array(
        'id'    => $value["id"],
        'name'  => basename($value["uniqName"]),
        'is_dir'=> 1
      );
    }
    return $data;
  }

  public function getGroupId($group){
    $sql = "SELECT * FROM groups WHERE uniqName='$group'";
    $res = $this->db->query($sql);
    if($res->num_rows() == 0) return;
    else return $res->row()->id;
  }
  public function showGroup($uniqName){
    $group = $this->getGroupId($uniqName);
    $sql = "SELECT * FROM groupShare WHERE `patner`='$group'";
    $res = $this->db->query($sql);
    $sol = $res->result_array();
    $data = [];
    foreach ($sol as $value) {
      $data[] = array(
        'id'        => $value['shareid'],
        'name'      => basename($value['path']),
        'is_dir'    => is_dir($value['path']),
        'is_img'    => @is_array(getimagesize($value['path']))?true:false,
        'link'      => @is_array(getimagesize($value['path']))?'data:image/*;base64,'.base64_encode(file_get_contents($value['path'])):null,
      );
    }
    return $data;
  }
  public function loadGroup($sid,$depth){
    $sql = "SELECT * FROM groupShare WHERE shareid='$sid'";
    $res = $this->db->query($sql);
    if($res->num_rows() == 0) return 0;
    $path = $res->row()->path;
    if($depth == ''){
      $list = array_diff(scandir($path), array('.','..'));
    }
    else {
      $path = realpath($path.$depth);
      $list = array_diff(scandir($path), array('.','..'));
    }
    $data = [];
    foreach ($list as $value) {
      $data[] = array(
        'id'    => $sid,
        'name'  => $value,
        'is_dir'=> is_dir($path.'/'.$value),
        'is_img'    => @is_array(getimagesize($path.'/'.$value))?true:false,
        'link'      => @is_array(getimagesize($path.'/'.$value))?'data:image/*;base64,'.base64_encode(file_get_contents($path.'/'.$value)):null,
      );
    }
    return $data;
  }

  public function getsharedwithgrouplist($file){
    $uid = $this->session->uid;
    $sql = "SELECT groups.uniqName FROM `groupShare` LEFT JOIN groups ON groupShare.patner=groups.id WHERE groupShare.userid='$uid' AND groupShare.path='$file'";
    $res = $this->db->query($sql);
    return $res->result_array();
  }

}
