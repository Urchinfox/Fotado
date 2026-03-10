// src/utils/dateUtils.js

/**
 * 格式化文章顯示日期：優先 updated_at，沒有就用 created_at
 * @param {Object} post - 文章物件，需有 created_at 和 updated_at
 * @param {string} [locale='zh-TW'] - 語言格式
 * @param {Object} [options] - toLocaleDateString 的選項
 * @returns {string} 格式化後的日期，例如 "2025年3月10日"
 */
export function formatArticleDate(post, locale = 'en-US', options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) {
    if (!post || !post.created_at) {
      return 'Unknown Date';
    }
  
    const date = post.updated_at ? new Date(post.updated_at) : new Date(post.created_at);
    return date.toLocaleDateString(locale, options);
  }
  
  /**
   * 取得日期標籤文字：有更新就 "最後更新"，否則 "發布於"
   * @param {Object} post
   * @returns {string}
   */
  
//   export function getDateLabel(post) {
//     return post?.updated_at ? '最後更新' : '發布於';
//   }