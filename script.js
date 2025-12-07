// --- ページ切り替えとタブ制御ロジック ---

/**
 * ページ表示切り替えの核となる関数
 * @param {string} pageId - 表示するコンテンツブロックの ID
 */
function showPage(pageId) {
    // 全てのページを非表示にする
    document.getElementById('home-page').classList.remove('visible');
    document.getElementById('product-list-page').classList.remove('visible');
    document.getElementById('product-detail-page').classList.remove('visible');
    document.getElementById('checkout-page').classList.remove('visible');
    document.getElementById('local-page').classList.remove('visible');
    document.getElementById('vendor-page').classList.remove('visible');
    
    // 対象ページを表示
    document.getElementById(pageId).classList.add('visible');
    // ページトップへスムーズにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

/**
 * 製品詳細ページのタブ切り替えロジック
 */
function switchTab(event, contentId) {
    // 1. 全てのタブボタンから active クラスを削除
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 2. 全てのタブコンテンツを非表示にする
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 3. クリックされたボタンに active クラスを追加
    event.currentTarget.classList.add('active');

    // 4. 対応するコンテンツブロックを表示
    document.getElementById(contentId).classList.add('active');
}


// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    // 【調整点】初期表示を商品一覧ページに設定
    showPage('product-list-page'); 
    
    // ナビゲーションイベントのバインド
    // ホームリンクは削除済みだが、ロゴクリック時は商品一覧へ
    document.getElementById('nav-logo').onclick = () => showPage('product-list-page'); 

    // 他のナビゲーションリンクのバインド
    document.getElementById('nav-products').onclick = () => showPage('product-list-page');
    document.getElementById('nav-local').onclick = () => showPage('local-page');
    document.getElementById('nav-vendor').onclick = () => showPage('vendor-page');
    document.getElementById('nav-cart').onclick = () => showPage('checkout-page');
    // nav-login は外部ファイルへの直接リンクのため、JS バインドは不要
    
    // 商品カードクリックで製品詳細ページへ遷移 (商品一覧/ホーム共通)
    document.querySelectorAll('.product-card').forEach(card => {
        card.onclick = () => showPage('product-detail-page');
    });
    
    // 製品詳細ページ内のカート/今すぐ購入ボタンから決済ページへ遷移
     document.getElementById('btn-add-to-cart-detail').onclick = (e) => { e.preventDefault(); showPage('checkout-page'); };
     document.getElementById('btn-buy-now-detail').onclick = (e) => { e.preventDefault(); showPage('checkout-page'); };
});