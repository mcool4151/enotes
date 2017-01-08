#include<stdio.h>
#include<string.h>
#include<stdlib.h>
struct team{
  char name[256];
  int mp,gf,ga,gd,p;
};
int main(){
  char t1[128],t2[128];
  int N,m,s1,s2,i1,i2;
  int **list;
  scanf("%d",&N);
  if(!(N > 0 && N < 10000)) return 0;
  struct team *tmt;
  tmt = (struct team *) calloc(N,sizeof(struct team));
  list = (int **) malloc(N * sizeof(int*));
  for(int i=0;i<N;i++) list[i] = (int *)malloc(sizeof(int));
  for(int i=0;i<N;i++) for(int j=0;j<N;j++) list[i][j]=0;
}
