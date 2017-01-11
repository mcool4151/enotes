<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Fileman extends CI_Model {
  public function __construct(){
    parent::__construct();
  }

  public function getdirarr($dir){
    $list = array_diff(scandir($dir), array('.','..'));
    $files = array();
    foreach ($list as $file) {
      $path = $dir.$file;
      $uid = $this->session->uid;
      $sql = "Select * from deleted where `uid`=$uid AND `path`='$path'";
      $res = $this->db->query($sql);
      if ($res->num_rows()) continue;
      $files[] = array(
        'name'    => $file,
        'is_dir'  => is_dir($dir.'/'.$file),
        'is_img'  => @is_array(getimagesize($dir.'/'.$file))?true:false,
        'link'    => (@is_array(getimagesize($dir.'/'.$file))?true:false)?base_url().'upload/'.$this->session->uid.'/'.$this->input->get('depth').'/'.$file:null
      );
    }
    return $files;
  }
  public function mv($from,$to){
    if (rename($from,$to.'/'.basename($from))) {
      $uid = $this->session->uid;
      $path = $to.'/'.basename($from);
      if(isShared($from)){
        $id = md5($from);
        $sql = "UPDATE `sharedlink` SET `path`=$from WHERE `uid`=$uid AND `path`='$path'";
        $this->db->query($sql);
      }
      if(isFav($from)){
        $sql = "UPDATE `favourites` SET `path`=$from WHERE `uid`=$uid AND `path`='$path'";
        $this->db->query($sql);
      }
      return 1;
    }
    else return 0;
  }
  public function rn($from,$to){
    $uid = $this->session->uid;
    if (rename($from,$to)) {
      if($this->isShared($from)){
        $id = md5($from);
        $sql = "UPDATE `sharedlink` SET `path`='$to' WHERE `uid`=$uid AND `path`='$from'";
        $this->db->query($sql);
      }
      if($this->isFav($from)){
        echo "here";
        $sql = "UPDATE `favourites` SET `path`='$to' WHERE `uid`=$uid AND `path`='$from'";
        $this->db->query($sql);
      }
      return 1;
    }
    else return 0;
  }
  public function mkdir($path){
      return mkdir($path,0777,false);
  }
  public function download($file){
    if(!is_dir($file)){
      if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
      }
    }
    else{
      echo "Folder download Not implemented";
    }
  }
  public function getlink($path){
    $res = $this->db->query("select * from sharedlink where path=$path");
    if($res->num_rows()){
      $row = $res->row();
      return $row['fileid'];
    }
  }
  public function addToFav($path){
    $data = array(
      'uid'   => $this->session->uid,
      'path'  => $path
    );
    $this->db->insert('favourites',$data);
  }
  public function isFav($path){
    $uid = $this->session->uid;
    $sql = "Select * from favourites where `uid`=$uid AND `path`='$path'";
    $res = $this->db->query($sql);
    return $res->num_rows();
  }
  public function getFavAll(){
    $uid = $this->session->uid;
    $sql = "Select * from favourites where uid='$uid'";
    $res = $this->db->query($sql);
    $files = [];
    foreach ($res->result_array() as $file) {
      $path = str_replace($this->session->dir,'',$file['path']);
      $img = @is_array(getimagesize($file['path']));
      $link = $img?base_url().'upload/'.$this->session->uid.'/'.str_replace($this->session->dir,'',$file['path']):null;
      $files[] = array(
        'path'    => $path,
        'name'    => basename($file['path']),
        'is_dir'  => is_dir($file['path']),
        'is_img'  => $img,
        'link'    => $link,
      );
    }
    return $files;
  }
  public function removeFromFav($path){
    $uid = $this->session->uid;
    $sql = "DELETE FROM `favourites` WHERE `uid`=$uid AND `path`='$path'";
    $this->db->query($sql);
  }
  public function checkfav($path){
    $uid = $this->session->uid;
    $sql = "Select * from favourites where path='$path' AND uid='$uid'";
    $res = $this->db->query($sql);
    return $res->num_rows();
  }
  public function addToDel($path){
    $data = array(
      'uid'   => $this->session->uid,
      'path'  => $path
    );
    $this->db->insert('deleted',$data);
  }
  public function getDelAll(){
    $uid = $this->session->uid;
    $sql = "Select * from deleted where uid='$uid'";
    $res = $this->db->query($sql);
    $files = [];
    foreach ($res->result_array() as $file) {
      $path = str_replace($this->session->dir,'',$file['path']);
      $img = @is_array(getimagesize($file['path']));
      $link = $img?base_url().'upload/'.$this->session->uid.'/'.str_replace($this->session->dir,'',$file['path']):null;
      $files[] = array(
        'path'    => $path,
        'name'    => basename($file['path']),
        'is_dir'  => is_dir($file['path']),
        'is_img'  => $img,
        'link'    => $link,
      );
    }
    return $files;
  }
  public function removeFromDel($path){
    $uid = $this->session->uid;
    $sql = "DELETE FROM `deleted` WHERE `uid`=$uid AND `path`='$path'";
    $this->db->query($sql);
  }
  public function checkdel($path){
    $uid = $this->session->uid;
    $sql = "Select * from deleted where path='$path' AND uid='$uid'";
    $res = $this->db->query($sql);
    return $res->num_rows();
  }
  public function makeShareLink($path){
    $id = md5($path);
    $data = array(
      'uid'   => $this->session->uid,
      'path'  => $path,
      'fileid'=> $id
    );
    $this->db->insert('sharedlink',$data);
    return $id;
  }
  public function isShared($path){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM `sharedlink` WHERE `uid`=$uid AND `path`='$path'";
    $res = $this->db->query($sql);
    return $res->num_rows();
  }
  public function removeSharedLink($path){
    $uid = $this->session->uid;
    $sql = "DELETE FROM `sharedlink` WHERE `uid`=$uid AND `path`=$path";
  }
}
