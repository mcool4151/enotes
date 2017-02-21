<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gplus extends CI_Controller {
  public function __construct(){
    parent::__construct();
  }
  public function login(){
    $this->load->library('composerpac');
    $id_token = $this->input->post('token');
    $CLIENT_ID = "884000251920-jsnc6o4o8buh4ek1s208avhj3p5atm07.apps.googleusercontent.com";
    $client = new Google_Client(['client_id' => $CLIENT_ID]);
    $payload = $client->verifyIdToken($id_token);
    if ($payload) {
      //$this->session->id = $payload['sub'];
      // If request specified a G Suite domain:
      //$domain = $payload['hd'];
      $this->load->model('check');
      if(!$this->check->checkAndLogin($payload['sub'],$payload['name'],$payload['email'])) {
        echo 0;
        return;
      }
      echo 1;
      $this->session->pic = $payload['picture'];
    } else echo 'p';
  }
}
