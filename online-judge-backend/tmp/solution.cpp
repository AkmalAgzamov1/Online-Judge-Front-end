#include <bits/stdc++.h>
using namespace std;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;

    vector<int> v(n);
    for(auto &x : v) cin >> x;

    cout << accumulate(v.begin(), v.end(), 0ll);
}
