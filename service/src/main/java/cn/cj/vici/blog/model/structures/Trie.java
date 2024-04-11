package cn.cj.vici.blog.model.structures;

import lombok.Data;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Data
public class Trie {
    
    private TrieNode root;
    private Map<Integer, String> idTitleMap;

    public Trie() {
        root = new TrieNode();
        idTitleMap = new ConcurrentHashMap<>();
    }

    public String getTitle(Integer id) {
        return idTitleMap.get(id);
    }

    public void insert(String word, int id) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            current.children.putIfAbsent(ch, new TrieNode());
            current = current.children.get(ch);
            current.ids.add(id);
        }
        current.isEndOfWord = true;
        idTitleMap.put(id, word);
    }

    public Set<Integer> search(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            if (!current.children.containsKey(ch)) {
                return new HashSet<>();
            }
            current = current.children.get(ch);
        }
        return current.ids;
    }

    public void delete(String word, int id) {
        delete(root, word, 0, id);
        idTitleMap.remove(id);
    }

    private boolean delete(TrieNode current, String word, int index, int id) {
        if (index == word.length()) {
            if (!current.isEndOfWord) {
                return false;
            }
            current.ids.remove(Integer.valueOf(id));
            current.isEndOfWord = !current.ids.isEmpty();
            return current.children.size() == 0;
        }

        char ch = word.charAt(index);
        TrieNode node = current.children.get(ch);
        if (node == null) {
            return false;
        }

        boolean shouldDelete = delete(node, word, index + 1, id);
        if (shouldDelete) {
            current.children.remove(ch);
            return current.children.size() == 0;
        }
        return false;
    }

    static class TrieNode {
        Map<Character, TrieNode> children;
        boolean isEndOfWord;
        Set<Integer> ids;

        public TrieNode() {
            children = new HashMap<>();
            isEndOfWord = false;
            ids = new HashSet<>();
        }
    }
    
}
