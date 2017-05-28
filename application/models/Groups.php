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

  private function checkpath($base,$test){
    if(!strncmp(realpath($test)."/",realpath($base)."/",strlen($base))) return 1;
    else return 0;
  }
  public function getsharedwithgrouplist($file){
    $uid = $this->session->uid;
    $sql = "SELECT groups.uniqName FROM `groupShare` LEFT JOIN groups ON groupShare.patner=groups.id WHERE groupShare.userid='$uid' AND groupShare.path='$file'";
    $res = $this->db->query($sql);
    return $res->result_array();
  }

  public function copygroupfile($sid,$depth,$to){
    $to = realpath($to)."/";
    $sql = "SELECT * FROM `groupShare` WHERE `shareid`='$sid'";
    $res = $this->db->query($sql);
    $src = $res->row()->path;
    $src = $src.$depth;
    if($this->checkpath($src,$to)){
      echo "Invalid operation";
      exit();
    }
    $fix = basename($src);
    if(!$this->smartCopy($src,$to.$fix))echo 0;
    else echo 1;
  }
  private function smartCopy($source, $dest, $options=array('folderPermission'=>0755,'filePermission'=>0755)){
    //Code from php.com
      $result=false;
      if (is_file($source)) {
          if ($dest[strlen($dest)-1]=='/') {
              if (!file_exists($dest)) {
                  cmfcDirectory::makeAll($dest,$options['folderPermission'],true);
              }
              $__dest=$dest."/".basename($source);
          } else {
              $__dest=$dest;
          }
          $result=copy($source, $__dest);
          chmod($__dest,$options['filePermission']);
      } elseif(is_dir($source)) {
          if ($dest[strlen($dest)-1]=='/') {
              if ($source[strlen($source)-1]=='/') {
                  //Copy only contents
              } else {
                  //Change parent itself and its contents
                  $dest=$dest.basename($source);
                  @mkdir($dest);
                  chmod($dest,$options['filePermission']);
              }
          } else {
              if ($source[strlen($source)-1]=='/') {
                  //Copy parent directory with new name and all its content
                  @mkdir($dest,$options['folderPermission']);
                  chmod($dest,$options['filePermission']);
              } else {
                  //Copy parent directory with new name and all its content
                  @mkdir($dest,$options['folderPermission']);
                  chmod($dest,$options['filePermission']);
              }
          }
          $dirHandle=opendir($source);
          while($file=readdir($dirHandle)){
              if($file!="." && $file!=".."){
                   if(!is_dir($source."/".$file)) {
                      $__dest=$dest."/".$file;
                  } else {
                      $__dest=$dest."/".$file;
                  }
                  //echo "$source/$file ||| $__dest<br />";
                  $result=$this->smartCopy($source."/".$file, $__dest, $options);
              }
          }
          closedir($dirHandle);
      } else {
          $result=false;
      }
      return $result;
  }
}
