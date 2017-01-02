<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Manage extends CI_Controller {
  public function __construct(){
		parent::__construct();
		if(!($this->session->loggedin == 1)){
			redirect('login');
		}
	}
  public function index(){
    $this->load->view('manage-page');
  }
  public function logout(){
    $this->session->sess_destroy();
    redirect('login');
  }
}
