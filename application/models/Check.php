<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Check extends CI_Model {
  public function __construct(){
    parent::__construct();
  }
  public function checkAndLogin($uid,$name,$email){
    $res = $this->db->query("Select * from users where uid='$uid'");
    if($res->num_rows() == 0){
      $data = array('name' => $name, 'email' => $email, 'uid' => $uid);
      $str = $this->db->insert_string('users', $data);
      if(!($this->db->simple_query($str))) return 0;
      if (!(mkdir(realpath(__DIR__."/../../")."/upload/$uid",0777,TRUE))) return 0;
    }
    else{
      if($res->row()->name != $name || $res->row()->email != $email)
      $this->db->query("UPDATE `users` SET `name`=`$name`,`email`=`$email` WHERE `uid`=`$uid`");
    }
    $data = array(
      'loggedin'  =>  '1',
      'uid'       =>  $uid,
      'name'      =>  $name,
      'email'     =>  $email,
      'dir'       =>  realpath(__DIR__."/../../upload/$uid").'/'
    );
    $this->session->set_userdata($data);
    return 1;
  }
}
