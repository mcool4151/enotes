<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Fileman extends CI_Model {
  public function __construct(){
    parent::__construct();
  }

  public function getswm(){
    $uid = $this->session->uid;
    $sql = "Select * from usershare where patner=$uid";
    $res = $this->db->query($sql);
    $data = [];
    foreach ($res->result_array() as $value) {
      $data[] = array(
        'id'    => $value["shareid"],
        'name'  => basename($value["path"]),
        'is_dir'=> is_dir($value['path']),
        'is_img'    => @is_array(getimagesize($value['path']))?true:false,
        'link'      => 'data:image/*;base64,'.base64_encode(file_get_contents($value['path'])),
      );
    }
    return $data;
  }

  public function openswm($id,$depth){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM usershare WHERE shareid='$id' AND patner='$uid'";
    $res = $this->db->query($sql);
    if($res->num_rows() == 0){
      echo "Error while Opening File";
      return 0;
    }
    $path = realpath($res->row()->path.$depth);
    $list = array_diff(scandir($path), array('.','..'));
    $data = [];
    foreach ($list as $value) {
      $data[] = array(
        'name'    => $value,
        'is_dir'  => is_dir($path.'/'.$value),
        'is_img'  => @is_array(getimagesize($path.'/'.$value))?true:false,
        'link'    => @is_array(getimagesize($path.'/'.$value))?'data:image/*;base64,'.base64_encode(file_get_contents($path.'/'.$value)):null,
      );
    }
    return $data;
  }

  private function checkpath($base,$test){
    if(!strncmp($test,$base,strlen($base))) return 1;
    else return 0;
  }

  public function copyshared($sid,$depth,$to){
    $sql = "SELECT * FROM `usershare` WHERE `shareid`='$sid'";
    $res = $this->db->query($sql);
    $src = $res->row()->path;
    $src = $src.$depth;
    if($this->checkpath($src,$to.'/')){
      echo "Invalid operation";
      return;
    }
    if(!$this->smartCopy($src,$to.'/')) echo "Error While copying";
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
  public function getsharedwithlist($file){
    $sql = "SELECT users.email FROM usershare JOIN users on usershare.patner=users.uid where usershare.path='$file'";
    $res = $this->db->query($sql);
    return $res->result_array();
  }

  public function sharewithGroup($file,$group){
    $sql = "SELECT * FROM `groups` WHERE `uniqName`='$group'";
    $res = $this->db->query($sql);
    if(!$res->num_rows()) {
      echo "eroor";
      exit(1);
    }
    $gid = $res->row()->id;
    $id = $this->session->uid;
    $sql = "SELECT * from groupShare where patner='$gid' AND path='$file'";
    if($this->db->query($sql)->num_rows() > 0) {
      echo "File Already Shared with group";
      return;
    }
    $sql = "SELECT * FROM `groupmembers` where `userid`='$id' AND `groupid`='$gid'";
    if($this->db->query($sql)->num_rows() > 0){
      $sql = "INSERT INTO `groupShare`(`userid`, `path`, `patner`) VALUES ('$id','$file','$gid')";
      if($this->db->query($sql)) return 1;
      else return 0;
    }
  }

  public function checkgroup($group){
    $uid = $this->session->uid;
    $sql = "SELECT groups.id,groups.userid,groups.uniqName FROM groups where groups.id IN (SELECT groupmembers.groupid FROM groupmembers WHERE groupmembers.userid='$uid' AND groups.uniqName='$group')";
    $res = $this->db->query($sql);
    if ($res->num_rows() == 0) return 0;
    else return $res->row()->id;
  }

  public function creategroup($id,$uniqname,$desc,$ispublic,$tags){
    $sql = "INSERT INTO `groups`(`userid`, `uniqName`, `description`, `isPublic`, `Tags`) VALUES ('$id','$uniqname','$desc','$ispublic','$tags')";
    if ($this->db->query($sql)) return 1;
  }

  public function addToGroup($id,$groupname){
    $sql = "SELECT * FROM `groups` WHERE `uniqName`='$groupname'";
    $res = $this->db->query($sql);
    if(!$res->num_rows()) {
      echo "eroor";
      exit(1);
    }
    $gid = $res->row()->id;
    $sql = "INSERT INTO `groupmembers`(`groupid`, `userid`) VALUES ('$gid','$id')";
    if($this->db->query($sql))return 1;
    else return 0;
  }

  public function joinGroup($id,$groupname){
    $sql = "SELECT * FROM `groups` WHERE `uniqName`='$groupname' AND `isPublic`='1'";
    $res = $this->db->query($sql);
    if(!$res->num_rows()) exit(1);
    $gid = $res->row()->id;
    $sql = "INSERT INTO `groupmembers`(`groupid`, `userid`) VALUES ('$gid','$id')";
    if($this->db->query($sql))return 1;
    else return 0;
  }

  public function leaveGroup($id,$groupname){
    $sql = "SELECT * FROM `groups` WHERE `uniqName`='$groupname' AND `isPublic`='1'";
    $res = $this->db->query($sql);
    if(!$res->num_rows()) exit(1);
    $gid = $res->row()->id;
    $sql = "DELETE FROM `groupmembers` WHERE `groupid`='$gid' AND `userid`='$id'";
    if($this->db->query($sql))return 1;
    else return 0;
  }

  public function getid($email){
    $res = $this->db->query("Select * from users where `email`='$email'");
    if($res->num_rows() == 0) return 0;
    return $res->row()->uid;
  }

  public function alreadysharedwith($file,$with){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM `usershare` WHERE `userid`='$uid' AND `path`='$file' AND `patner`='$with'";
    $res = $this->db->query($sql);
    if($res->num_rows() > 0 ) return 1;
    else return 0;
  }

  public function sharewith($file,$user){
    $uid = $this->session->uid;
    $sql = "INSERT INTO `usershare`(`userid`, `path`, `patner`) VALUES ('$uid','$file','$user')";
    $this->db->simple_query($sql);
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
        'name'      => $file,
        'is_dir'    => is_dir($dir.'/'.$file),
        'is_img'    => @is_array(getimagesize($dir.'/'.$file))?true:false,
        'link'      => (@is_array(getimagesize($dir.'/'.$file))?true:false)?base_url().'upload/'.$this->session->uid.'/'.$this->input->get('depth').'/'.$file:null,
        'is_slink'  => $this->isShared($dir.$file),
        'is_fav'    => $this->isFav($dir.$file),
        'lmd'       => date("F d Y H:i:s", filemtime($dir.$file)),
        'size'      => round((filesize($dir.$file)/(1024)),2).'KB'
      );
    }
    return $files;
  }
  public function mv($from,$to){
    $tmpto = $to.'/'.(basename($from));
    if((is_dir($from) && is_dir($tmpto)) || (!is_dir($from) && !is_dir($tmpto)) && file_exists($tmpto)){
      return "Cannot Move as file of that name already exists";
    }
    if (rename($from,$to.'/'.basename($from))) {
      $uid = $this->session->uid;
      $path = $to.'/'.basename($from);
      if($this->isShared($from)){
        $id = md5($from);
        $sql = "UPDATE `sharedlink` SET `path`='$from' WHERE `uid`=$uid AND `path`='$path'";
        $this->db->query($sql);
      }
      if($this->isFav($from)){
        $sql = "UPDATE `favourites` SET `path`='$from' WHERE `uid`=$uid AND `path`='$path'";
        $this->db->query($sql);
      }
      if($this->isGroupShared($from)){
        $sql = "UPDATE `groupShare` SET `path`='$from' WHERE `userid`=$uid AND `path`='$path'";
        $this->db->query($sql);
      }
      if($this->isUserShared($from)){
        $sql = "UPDATE `usershare` SET `path`='$from' WHERE `userid`=$uid AND `path`='$path'";
        $this->db->query($sql);
      }
      return 1;
    }
    else return 0;
  }
  public function rn($from,$to){
    if((is_dir($from) && is_dir($to)) || (!is_dir($from) && !is_dir($to)) && file_exists($to)){
      return "Cannot rename as file of that name already exists";
    }
    $uid = $this->session->uid;
    if (rename($from,$to)) {
      if($this->isShared($from)){
        $id = md5($from);
        $sql = "UPDATE `sharedlink` SET `path`='$to' WHERE `uid`=$uid AND `path`='$from'";
        $this->db->query($sql);
      }
      if($this->isFav($from)){
        $sql = "UPDATE `favourites` SET `path`='$to' WHERE `uid`=$uid AND `path`='$from'";
        $this->db->query($sql);
      }
      if($this->isGroupShared($from)){
        $sql = "UPDATE `groupShare` SET `path`='$to' WHERE `userid`=$uid AND `path`='$from'";
        $this->db->query($sql);
      }
      if($this->isUserShared($from)){
        $sql = "UPDATE `usershare` SET `path`='$to' WHERE `userid`=$uid AND `path`='$from'";
        $this->db->query($sql);
      }
      return 1;
    }
    else return 0;
  }
  public function mkdir($path){
    if(file_exists($path)) return "Files already exists in the directory, Select Another name or rename the old file";
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
      //echo "Folder download Not implemented";
      if(is_dir($file)){
        header("Content-Type: archive/zip");
        header("Content-Disposition: attachment; filename=".date('d-m-Y H:i:s').".zip");
        $tmp_zip = tempnam ("tmp", "tempname") . ".zip";
        $zip_file = $tmp_zip;
        //chdir($file);
        //exec('zip '.$tmp_zip.' *');
        //$fp = fopen("$tmp_zip","r");
        //echo fpassthru($fp);
        //unlink($tmp_zip);
        $rootPath = realpath($file);
        $zip = new ZipArchive();
        $zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        $files = new RecursiveIteratorIterator(
          new RecursiveDirectoryIterator($rootPath),
          RecursiveIteratorIterator::LEAVES_ONLY
        );
        foreach ($files as $name => $file){
          if (!$file->isDir()){
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);
            $zip->addFile($filePath, $relativePath);
          }
        }
        $zip->close();
        $filesize = filesize($tmp_zip);
        header("Content-Length: $filesize");
        readfile($zip_file);
        unlink($zip_file);
      }
    }
  }
  public function getlink($path){
    $res = $this->db->query("select * from sharedlink where `path`='$path'");
    if($res->num_rows()){
      $row = $res->row();
      return $row->fileid;
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
      'path'  => $path,
      'is_dir'=> is_dir($path),
    );
    $this->removeFromFav($path);
    $sql = "DELETE FROM `favourites` WHERE `path` LIKE '".$path.'/'."%'";
    $this->db->query($sql);
    $this->removeSharedLink($path);
    $sql = "DELETE FROM `sharedlink` WHERE `path` LIKE '".$path.'/'."%'";
    $this->db->query($sql);
    $this->revokefromGroup($path);
    $sql = "DELETE FROM `groupShare` WHERE `path` LIKE '".$path.'/'."%'";
    $this->db->query($sql);
    $this->revokefrom($path);
    $sql = "DELETE FROM `usershare` WHERE `path` LIKE '".$path.'/'."%'";
    $this->db->query($sql);
    $this->db->insert('deleted',$data);
    rename($path,$this->session->dir.'../delete/'.$this->db->insert_id());
    return 1;
  }
  public function getDelAll(){
    $uid = $this->session->uid;
    $sql = "Select * from deleted where uid='$uid'";
    $res = $this->db->query($sql);
    $files = [];
    foreach ($res->result_array() as $file) {
      $img = @is_array(getimagesize($file['path']));
      $files[] = array(
        'path'    => $file['id'],
        'name'    => basename($file['path']),
        'is_dir'  => $file['is_dir'],
        'is_img'  => $img,
        'link'    => null
      );
    }
    return $files;
  }
  public function removeFromDel($path){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM deleted WHERE `id`='$path'";
    $res = $this->db->query($sql);
    $res = $res->result_array();
    if(file_exists($res[0]['path'])) return "Error While Restoring";
    else{
      rename($this->session->dir.'../delete/'.$res[0]['id'],$res[0]['path']);
      $id = $res[0]['id'];
      $sql = "DELETE FROM deleted WHERE `id`='$id'";
      $this->db->query($sql);
    }
    return 1;
  }
  public function checkdel($path){
    /*$uid = $this->session->uid;
    $sql = "Select * from deleted where path='$path' AND uid='$uid'";
    $res = $this->db->query($sql);
    return $res->num_rows();*/
    return 0;
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
  public function isGroupShared($path){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM `groupShare` WHERE `userid`=$uid AND `path`='$path'";
    $res = $this->db->query($sql);
    return $res->num_rows();
  }
  public function isUserShared($path){
    $uid = $this->session->uid;
    $sql = "SELECT * FROM `usershare` WHERE `userid`=$uid AND `path`='$path'";
    $res = $this->db->query($sql);
    return $res->num_rows();
  }
  public function removeSharedLink($path){
    $uid = $this->session->uid;
    $sql = "DELETE FROM `sharedlink` WHERE `uid`=$uid AND `path`='$path'";
    $this->db->query($sql);
  }
  public function revokefrom($file,$user=''){
    $uid = $this->session->uid;
    if($user == '') $sql = "DELETE FROM `usershare` WHERE `userid`='$uid' AND `path`='$file'";
    else $sql = "DELETE FROM `usershare` WHERE `userid`='$uid' AND `path`='$file' AND `patner`='$user'";
    if($this->db->query($sql)) return 1;
    else return 0;
  }
  public function revokefromGroup($file,$group=''){
    $uid = $this->session->uid;
    if($group == ''){
      $sql = "DELETE FROM `groupShare` WHERE `userid`='$uid' AND `path`='$file'";
      if($this->db->query($sql)) return 1;
      else return 0;
      return;
    }
    $sql = "SELECT * FROM `groups` WHERE `uniqName`='$group'";
    $res = $this->db->query($sql);
    if(!$res->num_rows()) {
      echo "eroor";
      exit(1);
    }
    $gid = $res->row()->id;
    $sql = "DELETE FROM `groupShare` WHERE `userid`='$uid' AND `path`='$file' AND `patner`='$gid'";
    if($this->db->query($sql)) return 1;
    else return 0;
  }
  public function deleteforever($file){
    $sql = "DELETE FROM deleted WHERE `id`='$file'";
    $file = realpath($this->session->dir.'../delete/'.$file);
    exec("rm -rf ".$file);
    if($this->db->query($sql)) return 1;
    else return 0;
  }
}
