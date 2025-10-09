let bookmarks = []; // in memory space
let currentId = 1;

export async function addBookmark(req, res, next) {
  try {
    const { category, url } = req.body;
    if (!category || !url) {
      return res.status(400).json({ error: "Category and Url are required" });
    }

    const newBookmark = { id: currentId++, category, url, favorite: false };
    bookmarks.push(newBookmark);
    return res.status(201).json(newBookmark);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occured while adding the bookmark" });
  }
}

export async function deleteBookmark(req, res, next) {
  try {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id == id);
    if (bookmarkIndex === -1) {
      return res.status(404).json({ error: "Bookmark not found" });
    }
    bookmarks.splice(bookmarkIndex, 1);
    return res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occured while deleting the bookmark",
    });
  }
}

export async function getAllBookmarks(req, res, next) {
  res.json(bookmarks);
}

export async function searchBookmark(req, res, next) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Query parameter missing" });
  }

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.category.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filteredBookmarks);
}

export async function favoriteBookmark(req, res, next) {
  const favoriteBookmarks = bookmarks.filter((bookmark) => bookmark.favorite);
  return res.status(200).json(favoriteBookmarks);
}
