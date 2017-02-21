<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Groups extends CI_Model {
  public function __construct(){
    parent::__construct();
  }

  public function getmyGroups(){
    $uid = $this->session->uid;
    $sql = "SELECT groups.id,groups.userid,groups.uniqName FROM groups where groups.id IN (SELECT groupmembers.groupid FROM groupmembers WHERE groupmembers.userid='$uid')";
    $res = $this->db->query($sql);
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
    $sql = "SELECT * FROM `groups` WHERE NOT EXISTS(SELECT groupmembers.groupid FROM groupmembers WHERE groupmembers.userid='$uid') AND isPublic=1";
    $res = $this->db->query($sql);
    return $res->result_array();
  }

  public function loadGroup($group,$depth){
    $sql = "SELECT * FROM groupshare WHERE patner='$group'";
    $res = $this->db->query($sql);
    $path = $res->row()->path;
    if($depth == ''){
      $list = array_diff(scandir($path), array('.','..'));
    }
    else {
      $path = realpath($path.$depth);
      $list = array_diff(scandir($path), array('.','..'));$data = [];
      foreach ($list as $value) {
        $data[] = array(
          'id'    => $group,
          'name'  => $value,
          'is_dir'=> is_dir($path.'/'.$value),
          'is_img'    => @is_array(getimagesize($value['path']))?true:false,
          'link'      => 'data:image/*;base64,'.base64_encode(file_get_contents($value['path'])),
        );
      }
      return $data;
    }
  }

  public function getsharedwithgrouplist($file){
    $uid = $this->session->uid;
    $sql = "SELECT groups.uniqName FROM `groupShare` LEFT JOIN groups ON groupShare.patner=groups.id WHERE groupShare.userid='$uid' AND groupShare.path='$file'";
    $res = $this->db->query($sql);
    return $res->result_array();
  }

}
